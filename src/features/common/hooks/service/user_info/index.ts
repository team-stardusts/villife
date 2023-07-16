import { useCallback, useEffect } from "react";
import { UserDataType } from "../../../../../libs/storage/tables/user/types";
import { IUserInfoService, UseUserInfoServiceReturns } from "./types";
import VillifeStorage from "../../../../../libs/storage";
import { SimpleBuildingInfo, IVillifeUserInfoRestClient } from "../../../../../libs/rest_apis/villife/user_info/types";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import { useRecoilState } from "recoil";
import { userBasicInfoState } from "../../states/atoms/user/basic_information";
import { adminInfoState } from "../../states/atoms/user/admin_only";
import { Response } from "../../../../../libs/rest_apis/types";
import { AdminInformation } from "../../states/atoms/user/admin_only/type";
import { Authority } from "../../../../../libs/rest_apis/villife/types";
import { VILLIFE_AUTHORITY } from "../../../../../libs/rest_apis/villife/absc";

export default function useUserInfoService(): UseUserInfoServiceReturns {
    const [userBasicInfo, setUserBasicInfo] = useRecoilState(userBasicInfoState);
    const [adminInfo, setAdminInfo] = useRecoilState(adminInfoState);

    const isAdmin = useCallback((): boolean | null => {
        //console.log(userService.basicInfo?.authority);
        if (userBasicInfo?.authority === undefined) return null;

        return (
            userBasicInfo.authority === VILLIFE_AUTHORITY.ADMIN || userBasicInfo.authority === VILLIFE_AUTHORITY.OWNER
        );
    }, [userBasicInfo, adminInfo]);

    const updateUserInfo = async () => {
        try {
            const result = await service.getUserBasicInfo();
            setUserBasicInfo(result);

            console.log(
                "[CURRENT_USER_AUTHRITY]",
                Object.keys(VILLIFE_AUTHORITY).find(
                    (key) => VILLIFE_AUTHORITY[key as keyof Authority] === result.authority
                )
            );
            console.log("[CURRENT_USER_NAME]", result.name);
            console.log("[CURRENT_BUILDING_ID]", result.building_id);

            if (result.authority == VILLIFE_AUTHORITY.ADMIN) {
                const result = await service.fetchBuildingsManagedByAdmin();
                //console.log("Result of fetching admin's buildings: ", result.data?.data);

                if (result.isSuccessful) {
                    // 첫 번째 빌딩 Info를 SelectedBuilding으로 지정
                    if (!result.data?.data[0]) return;

                    const adminInformation: AdminInformation = {
                        selectedBuilding: result.data?.data[0],
                        managedBuildings: result.data.data,
                    };

                    console.log("AdminInformation.SelectedBuilding: ", adminInformation.selectedBuilding);
                    setAdminInfo(adminInformation);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const changeSelectedBuildingOfAdmin: (building?: SimpleBuildingInfo) => boolean = (
        building?: SimpleBuildingInfo
    ) => {
        if (!building) return false;

        if (adminInfo?.selectedBuilding === undefined) return false;

        setAdminInfo({
            ...adminInfo,
            selectedBuilding: building,
        });

        return true;
    };

    const clearUserInfo = async () => {
        setUserBasicInfo(null);
        setAdminInfo(null);
        await service.removeUserBasicInfo();
    };

    const resetUserInfo = async () => {
        try {
            const result = await service.resetUserBasicInfo();

            if (result !== undefined) {
                await updateUserInfo();
            }

            return result;
        } catch (e) {
            console.log("Reset Err", e);
        }
    };

    useEffect(() => {
        if (!userBasicInfo?.authority) {
            updateUserInfo();
        }
    }, []);

    const service: IUserInfoService = new UserInfoService();

    return {
        basicInfo: userBasicInfo,
        adminInfo,
        service,
        isAdmin,
        changeSelectedBuildingOfAdmin,
        clearUserInfo,
        resetUserInfo,
    };
}

export class UserInfoService implements IUserInfoService {
    private storage = VillifeStorage.getInstance();
    private api: IVillifeUserInfoRestClient = VillifeServer.getUserInfoRestClient();

    async getUserBasicInfo(): Promise<UserDataType> {
        const userInfo = await this.storage.user.get();
        if (userInfo != null) return userInfo;

        return this.fetchAndStoreUserBasicInfo();
    }

    async fetchAndStoreUserBasicInfo() {
        try {
            console.log("[FetchAndStoreUserBasicInfo] fetching user info ...");
            const result = await this.api.GetUserBasicInfo();

            if (!result.isSuccessful) {
                console.log("fetchAndStoreUserBasicInfo failure: ", result.data?.data);
                throw new Error("cannot get get user basic info from api");
            }

            if (!result.data?.data) throw new Error("cannot find data");

            const originalData = result.data?.data;

            let adjustedData: UserDataType = originalData;

            if (result.data.data.building_id == 0 || result.data.data.room_id == 0) {
                adjustedData = {
                    name: originalData.name,
                    authority: originalData.authority,
                    room_id: undefined,
                    building_id: undefined,
                };
            }

            const isSet = await this.storage.user.set(adjustedData);
            if (isSet) return adjustedData;
            else throw new Error("cannot store user info");
        } catch (err) {
            console.log("Happend unexcepted error in fetchAndStoreUserBasicInfo: ", err);
            throw new Error("cannot get user info");
        }
    }

    async removeUserBasicInfo() {
        return await this.storage.user.set(null);
    }

    async resetUserBasicInfo() {
        console.log("Resetting user basic info ...");
        const isSet = await this.storage.user.set(null);
        if (isSet) {
            return await this.fetchAndStoreUserBasicInfo();
        } else console.log("failed to reset user basic info stroage");
    }

    async fetchBuildingsManagedByAdmin(): Response<Array<SimpleBuildingInfo>> {
        return await this.api.getBuildingsManagedByAdmin();
    }
}
