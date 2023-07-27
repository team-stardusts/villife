import { LoginDataType } from "../../../../../libs/storage/tables/login/types";
import { AdminInformation } from "../../states/atoms/user/admin_only/type";

export interface IUserInfoProvidable<T> {
    readonly rawdata: T;
}

export interface IUserInfoProvider extends IUserInfoProvidable<LoginDataType> {
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

export interface IAdminInfoProvider extends IUserInfoProvidable<AdminInformation> {
    selectedBuilding: AdminInformation["selectedBuilding"];
    managedBuildings: AdminInformation["managedBuildings"];
}

export type UseUserBasicInfoReturns = IUserInfoProvider | null;

export type UseAdminInfoReturns = IAdminInfoProvider | null;
