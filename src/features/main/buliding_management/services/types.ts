import IVillifeBuildingManager, { Building } from "../../../../libs/rest_apis/villife/building/types";

interface BuildingTenantsGetable {
    //getTentantsFromServer(buildingID: number): Promise<Building.Tenant[]>;
    getTentants(buildingID: number): Promise<BuildingTenant[]>;
}

export type BuildingTenant = {
    floor: number;
    roomNumber: number;
    roomState: Building.Tenant["room_state"];
    contractStatus: Building.Tenant["contract_status"];
    contract?: TenantContract;
    residentID?: string;
    residentName?: string;
    residentPhoneNumber?: string;
};

export type TenantContract = {
    rent_type: Building.Contract["rent_type"];
    deposit: number;
    monthlyRent: number;
    managementFee: number;
    startDate: Date;
    expirationDate: Date;
    createdAt: Date;
    updatedAt: Date;
};

export interface IBuildingManagementService extends BuildingTenantsGetable {}
