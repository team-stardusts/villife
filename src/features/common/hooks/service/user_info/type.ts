import { Response } from "../../../../../libs/rest_apis/types";
import { SimpleBuildingInfo } from "../../../../../libs/rest_apis/villife/user_info/types";
import { UserDataType } from "../../../../../libs/storage/tables/user/types";

export interface IUserInfoService {
    getUserBasicInfo(): Promise<UserDataType>;
    resetUserBasicInfo(): void;
    fetchBuildingsManagedByAdmin(): Response<Array<SimpleBuildingInfo>>;
}
