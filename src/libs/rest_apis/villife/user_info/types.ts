import { Response } from "../../types";

export interface IVillifeUserInfoRestClient {
    getUserBasicInfo(): Response<any>;
    getBuildingsManagedByAdmin(): Response<Array<SimpleBuildingInfo>>;
}

export type SimpleBuildingInfo = {
    id: number;
    owner: string;
    address: string;
    name: string;
};
