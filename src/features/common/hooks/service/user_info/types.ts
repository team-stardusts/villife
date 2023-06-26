import { Response } from "../../../../../libs/rest_apis/types";
import { SimpleBuildingInfo } from "../../../../../libs/rest_apis/villife/user_info/types";
import { UserDataType } from "../../../../../libs/storage/tables/user/types";
import { AdminInformation } from "../../states/atoms/user/admin_only/type";

export type UseUserInfoServiceReturns = {
    basicInfo: UserDataType | null;
    adminInfo: AdminInformation | null;
    service: IUserInfoService;
    changeSelectedBuildingOfAdmin(building?: SimpleBuildingInfo): boolean;
    isAdmin(): boolean;
};

export interface IUserInfoService {
    getUserBasicInfo(): Promise<UserDataType>;
    removeUserBasicInfo(): void;
    fetchBuildingsManagedByAdmin(): Response<Array<SimpleBuildingInfo>>;
}
