import { useEffect } from "react";
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
import { LoginDataStateType } from "../../states/atoms/login/types";
import { loginDataState } from "../../states/atoms/login";

export default function useUserInfoService(): UseUserInfoServiceReturns {
    const [loginData] = useRecoilState<LoginDataStateType>(loginDataState);
    const [userBasicInfo, setUserBasicInfo] = useRecoilState(userBasicInfoState);
    const [adminInfo, setAdminInfo] = useRecoilState(adminInfoState);

    const isAdmin = (): boolean => {
        //console.log(userService.basicInfo?.authority);
        if (userBasicInfo?.authority === undefined) return false;

        return (
            userBasicInfo.authority === VILLIFE_AUTHORITY.ADMIN || userBasicInfo.authority === VILLIFE_AUTHORITY.OWNER
        );
    };

    const updateUserInfo = async () => {
        const result = await service.getUserBasicInfo();

        setUserBasicInfo(result);

        console.log(
            "[CURRENT_USER_AUTHRITY]",
            Object.keys(VILLIFE_AUTHORITY).find((key) => VILLIFE_AUTHORITY[key as keyof Authority] === result.authority)
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
    };

    const changeSelectedBuildingOfAdmin: (building?: SimpleBuildingInfo) => boolean = (
        building?: SimpleBuildingInfo
    ) => {
        if (!building) return false;

        const newAdminInfo = adminInfo;

        if (newAdminInfo?.selectedBuilding === undefined) return false;

        newAdminInfo.selectedBuilding = building;
        setAdminInfo(newAdminInfo);

        return true;
    };

    // Login data 변경 시 업데이트
    useEffect(() => {
        if (loginData === null) {
            console.log("asdfasdfas");
            service.removeUserBasicInfo().then((r) => {
                console.log("Reset user info:", r);
            });
            setUserBasicInfo(null);
            setAdminInfo(null);

            return;
        }

        if (!userBasicInfo?.authority) updateUserInfo();
    }, [loginData]);

    /* useEffect(() => {
        if (loginData === null) return;
    }, []); */

    const service: IUserInfoService = new UserInfoService();

    return {
        basicInfo: userBasicInfo,
        adminInfo,
        service,
        isAdmin,
        changeSelectedBuildingOfAdmin,
    };
}

export class UserInfoService implements IUserInfoService {
    private storage = new VillifeStorage();
    private api: IVillifeUserInfoRestClient = VillifeServer.getUserInfoRestClient();

    async getUserBasicInfo(): Promise<UserDataType> {
        const userInfo = await this.storage.user.get();
        if (userInfo != null) return userInfo;

        return this.fetchAndStoreUserBasicInfo();
    }

    async fetchAndStoreUserBasicInfo() {
        try {
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
        const isSet = await this.storage.user.set(null);
        if (isSet) {
            return this.fetchAndStoreUserBasicInfo();
        } else console.log("failed to reset user basic info stroage");
    }

    async fetchBuildingsManagedByAdmin(): Response<Array<SimpleBuildingInfo>> {
        return await this.api.getBuildingsManagedByAdmin();
    }
}
