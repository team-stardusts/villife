import { Response } from "../../../../../libs/rest_apis/types";
import { SimpleBuildingInfo } from "../../../../../libs/rest_apis/villife/user_info/types";
import { UserDataType } from "../../../../../libs/storage/tables/user/types";
import { AdminInformation } from "../../states/atoms/user/admin_only/type";

export type UseUserInfoServiceReturns = {
    basicInfo: UserDataType | null;
    adminInfo: AdminInformation | null;
    service: IUserInfoService;
    changeSelectedBuildingOfAdmin(building?: SimpleBuildingInfo): boolean;
    isAdmin(): boolean | null; // Data가 채워지기 전이면 null을 return
    clearUserInfo(): Promise<void>;
    resetUserInfo(): Promise<UserDataType | undefined>;
};

export interface IUserInfoService {
    getUserBasicInfo(): Promise<UserDataType>;
    removeUserBasicInfo(): Promise<boolean>;
    resetUserBasicInfo(): Promise<UserDataType | undefined>;
    fetchBuildingsManagedByAdmin(): Response<Array<SimpleBuildingInfo>>;
}
