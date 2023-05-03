import { UserDataType } from "../../../../../libs/storage/tables/user/types";

export interface IUserInfoService {
    getUserBasicInfo(): Promise<UserDataType | Error>;
    resetUserBasicInfo(): void;
}
