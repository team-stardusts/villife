import { UserDataType } from "../../../storage/tables/user/types";
import { Response } from "../../types";

export interface IVillifeUserInfoRestClient {
    GetUserBasicInfo(): Response<UserDataType>;
    GetBuildingsManagedByAdmin(): Response<Array<SimpleBuildingInfo>>;
}

export type SimpleBuildingInfo = {
    id: number;
    owner: string;
    address: string;
    name: string;
};
