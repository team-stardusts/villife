import React0, { useEffect } from "react";
import { UserDataType } from "../../../../../libs/storage/tables/user/types";
import { IUserInfoService } from "./type";
import VillifeStorage from "../../../../../libs/storage";
import { SimpleBuildingInfo, IVillifeUserInfoRestClient } from "../../../../../libs/rest_apis/villife/user_info/types";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import { useRecoilState } from "recoil";
import { userBasicInfoState } from "../../states/atoms/user/basic_information";
import { adminInfoState } from "../../states/atoms/user/admin_only";
import { Response } from "../../../../../libs/rest_apis/types";
import { AdminInformation } from "../../states/atoms/user/admin_only/type";
import { AUTHORITY } from "./constant";
import { Authority } from "../../../../../libs/rest_apis/villife/types";

export default function useUserInfoService() {
    const [userBasicInfo, setUserBasicInfo] = useRecoilState(userBasicInfoState);
    const [adminInfo, setAdminInfo] = useRecoilState(adminInfoState);

    const updateUserInfo = async () => {
        const result = await service.getUserBasicInfo();

        setUserBasicInfo(result);

        console.log(
            "[CURRENT_USER_AUTHRITY]",
            Object.keys(AUTHORITY).find((key) => AUTHORITY[key as keyof Authority] === result.authority)
        );
        console.log("[CURRENT_USER_NAME]", result.name);

        if (result.authority == AUTHORITY.ADMIN) {
            const result = await service.fetchBuildingsManagedByAdmin();
            console.log("Result of fetching admin's buildings: ", result.data?.data);

            if (result.isSuccessful) {
                if (!result.data?.data[0]) return;

                const adminInformation: AdminInformation = {
                    selectedBuilding: result.data?.data[0],
                    managedBuildings: result.data.data,
                };

                console.log("AdminInformation: ", adminInformation);
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

    useEffect(() => {
        if (!userBasicInfo?.authority) updateUserInfo();
    }, []);

    const service: IUserInfoService = new UserInfoService();

    return {
        basicInfo: userBasicInfo,
        service: service,
        adminInfo: adminInfo,
        changeSelectedBuildingOfAdmin: changeSelectedBuildingOfAdmin,
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

    async resetUserBasicInfo() {
        const isSet = await this.storage.user.set(null);
        if (isSet) return;
        else console.log("failed to reset user basic info stroage");
    }

    async fetchBuildingsManagedByAdmin(): Response<Array<SimpleBuildingInfo>> {
        return await this.api.GetBuildingsManagedByAdmin();
    }
}
