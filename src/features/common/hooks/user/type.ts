import { UserDataType } from "../../../../libs/storage/tables/user/types";

export interface VillifeUserAPI {
    getUserBasicInfo(): Promise<UserDataType>;
}

export interface IUserService {
    getUserBasicInfo(): Promise<UserDataType | Error>;
}
