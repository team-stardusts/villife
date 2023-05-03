import React0 from "react";
import { UserDataType } from "../../../../../libs/storage/tables/user/types";
import { IUserInfoService } from "./type";
import VillifeStorage from "../../../../../libs/storage";
import { IVillifeUserInfoRestClient } from "../../../../../libs/rest_apis/villife/user_info/types";
import VillifeServer from "../../../../../libs/rest_apis/villife";

export default function useUserInfoService(): IUserInfoService {
    const service: IUserInfoService = new UserInfoService();
    return service;
}

class UserInfoService implements IUserInfoService {
    private stroage = new VillifeStorage();
    private api: IVillifeUserInfoRestClient = VillifeServer.getUserInfoRestClient();

    async getUserBasicInfo(): Promise<UserDataType | Error> {
        const userInfo = await this.stroage.user.get();
        if (userInfo != null) return userInfo;

        return this.fetchAndStoreUserBasicInfo();
    }

    async fetchAndStoreUserBasicInfo() {
        try {
            const result = await this.api.GetUserBasicInfo();
            if (!result.isSuccessful) {
                console.log(result.data?.data);
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
            const isSet = await this.stroage.user.set(adjustedData);
            if (isSet) return adjustedData;
            else throw new Error("cannot store user info");
        } catch (err) {
            console.log(err);
            throw new Error("cannot get user info");
        }
    }

    async resetUserBasicInfo() {
        const isSet = await this.stroage.user.set(null);
        if (isSet) return;
        else console.log("failed to reset user basic info stroage");
    }
}
