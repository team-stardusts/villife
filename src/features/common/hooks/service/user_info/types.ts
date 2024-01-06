import { LoginDataType } from "../../../../../libs/storage/tables/login/types";
import Villife from "../../../../../libs/villife-client/types";
import { AdminInformation } from "../../states/atoms/user/admin_only/type";

interface IInfoProvidable<T> {
    readonly rawdata: T;
}

interface IUserInfoProvidable {
    host: LoginDataType["host"];
    name: LoginDataType["name"];
    authority: LoginDataType["authority"];
    roomID: LoginDataType["roomId"];
    roomNumber: LoginDataType["roomNumber"];
    buildingID: LoginDataType["buildingId"];
    buildingRoadAddress: LoginDataType["buildingRoadAddr"];
}

interface IAdminInfoProvidable {
    adminInfomation: AdminInformation | null;
    changeAdminSelectedBuilding(building: Villife.User.SimpleBuildingInfo): void;
}

export interface UserInfo extends IInfoProvidable<LoginDataType>, IUserInfoProvidable, IAdminInfoProvidable {
    isRenter: boolean;
    isOwner: boolean;
    isAdmin: boolean;
    isSiteAdmin: boolean;
    setResidence(buildingID: number, roomID: number): void;
}
/* accessToken: LoginDataType["accessToken"];
refreshToken: LoginDataType["refreshToken"]; */
