import { SimpleBuildingInfo } from "../../../../../libs/rest_apis/villife/user_info/types";
import { LoginDataType } from "../../../../../libs/storage/tables/login/types";
import { AdminInformation } from "../../states/atoms/user/admin_only/type";

interface IInfoProvidable<T> {
    readonly rawdata: T;
}

interface IUserInfoProvidable {
    host: LoginDataType["host"];
    name: LoginDataType["name"];
    authority: LoginDataType["authority"];
    roomID: LoginDataType["room_id"];
    roomNumber: LoginDataType["room_number"];
    buildingID: LoginDataType["building_id"];
    buildingRoadAddress: LoginDataType["building_road_addr"];
}

interface IAdminInfoProvidable {
    adminInfomation: AdminInformation | null;
    changeAdminSelectedBuilding(building: SimpleBuildingInfo): void;
}

export interface IUserInfoProvider extends IInfoProvidable<LoginDataType>, IUserInfoProvidable, IAdminInfoProvidable {
    isRenter: boolean;
    isOwner: boolean;
    isAdmin: boolean;
    isSiteAdmin: boolean;
    setResidence(buildingID: number, roomID: number): void;
}
/* accessToken: LoginDataType["accessToken"];
refreshToken: LoginDataType["refreshToken"]; */

export type UseUserInfoReturns = IUserInfoProvider | null;
