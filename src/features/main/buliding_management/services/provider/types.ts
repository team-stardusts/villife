import type { VerifyBuildingAddressResult } from "../../../../../libs/rest_apis/villife/approval/types";
import type { Building } from "../../../../../libs/rest_apis/villife/building/types";
import { SelectedAddressType } from "../../../../common/hooks/states/atoms/address/selected_address/types";

export interface IBuildingManagementServiceProvider extends IBuildingTenantsGetable, IBuildingVerifiable {}

interface IBuildingTenantsGetable {
    //getTentantsFromServer(buildingID: number): Promise<Building.Tenant[]>;
    getTentants(buildingID: number): Promise<BuildingTenant[]>;
}

interface IBuildingVerifiable {
    verifyBuildingAddress(params: VerifyBuildingAddress.Params): Promise<VerifyBuildingAddress.Returns>;
}

export namespace VerifyBuildingAddress {
    export type Params = SelectedAddressType;
    export type Returns = {
        id: VerifyBuildingAddressResult["building_id"];
        name: VerifyBuildingAddressResult["building_name"];
    } | null;
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
    rentType: Building.Contract["rent_type"];
    deposit: number;
    monthlyRent: number;
    managementFee: number;
    startDate: Date;
    expirationDate: Date;
    createdAt: Date;
    updatedAt: Date;
};
