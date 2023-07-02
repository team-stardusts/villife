import { Response } from "../../types";

export type VerifyBuildingAddressParams = {
    address: string;
};

export type VerifyBuildingAddressResult = {
    building_id: number;
    building_name: string;
};

export type ApprovalDecisionParams = {
    request_id: number;
    decision: string;
};

export type Approval = {
    id: number;
    category: number;
    detail_type: number;
    create_at: number;
    updated_at: number;
    content: string;
};

export type getApprovalsResult = Array<Approval>;

interface Approavalable {
    verifyBuildingAddress(params: VerifyBuildingAddressParams): Response<VerifyBuildingAddressResult>;
    getUserApprovals(): Response<getApprovalsResult>;
    rejectUserApproval(request_id: number): Response<string>;
    acceptUserApproval(request_id: number): Response<string>;
}

export default interface IVillifeApprovalManager extends Approavalable {}
