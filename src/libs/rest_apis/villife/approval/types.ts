import { Response } from "../../types";

interface Approavalable {
    verifyBuildingAddress(params: VerifyBuildingAddressParams): Response<VerifyBuildingAddressResult>;
}

export type VerifyBuildingAddressParams = {
    address: string;
};

export type VerifyBuildingAddressResult = {
    building_id: number;
    building_name: string;
};

export default interface IVillifeApprovalManager extends Approavalable {}
