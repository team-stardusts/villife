import IVillifeBuildingManager, { Building } from "../../../../libs/rest_apis/villife/building/types";

interface BuildingTenantsGetable {
    //getTentantsFromServer(buildingID: number): Promise<Building.Tenant[]>;
    getTentants(buildingID: number): Promise<BuildingTenant[]>;
}

export type BuildingTenant = {
    floor: number;
    roomType: Building.Tenant["room_type"];
    contractType: Building.Tenant["contract_type"];
    roomNumber: number;
    contractStartedAt: Date;
    contractEndedAt: Date;
};

export interface IBuildingManagementService extends BuildingTenantsGetable {}
