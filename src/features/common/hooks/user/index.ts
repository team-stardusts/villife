import React0 from "react";
import { UserDataType } from "../../../../libs/storage/tables/user/types";
import { IUserService, VillifeUserAPI } from "./type";
import VillifeStorage from "../../../../libs/storage";

export default function useUserService(): IUserService {
    const service: IUserService = new UserService();
    return service;
}

class UserService implements IUserService {
    private stroage = new VillifeStorage();
    private api: VillifeUserAPI = new FakeAPI();

    async getUserBasicInfo(): Promise<UserDataType | Error> {
        const userInfo = await this.stroage.user.get();
        if (userInfo != null) return userInfo;

        return this.fetchAndStoreUserBasicInfo();
    }

    async fetchAndStoreUserBasicInfo() {
        try {
            const result: UserDataType = await this.api.getUserBasicInfo();
            const isSet = await this.stroage.user.set(result);
            if (isSet) return result;
            else return new Error("cannot store user info");
        } catch (err) {
            console.log(err);
            return new Error("cannot get user info");
        }
    }
}

class FakeAPI implements VillifeUserAPI {
    async getUserBasicInfo(): Promise<UserDataType> {
        return {
            name: "tester",
            authority: 3,
            room_id: 1,
            building_id: 3,
        };
    }
}
