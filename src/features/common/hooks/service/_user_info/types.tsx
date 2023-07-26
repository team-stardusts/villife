import { LoginDataType } from "../../../../../libs/storage/tables/login/types";

export interface IUserInfoProvider {
    rawdata: LoginDataType;
    host: LoginDataType["host"];
    name: LoginDataType["name"];
    authority: LoginDataType["authority"];
    roomID: LoginDataType["room_id"];
    buildingID: LoginDataType["building_id"];
    isRenter: boolean;
    isOwner: boolean;
    isAdmin: boolean;
    isSiteAdmin: boolean;
    /* accessToken: LoginDataType["accessToken"];
    refreshToken: LoginDataType["refreshToken"]; */
}

export type UseUserInfoServiceReturns = IUserInfoProvider | null;
