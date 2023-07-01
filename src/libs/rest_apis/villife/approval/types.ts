import { Response } from "../../types";

export type VerifyBuildingAddressParams = {
    address: string;
};

export type VerifyBuildingAddressResult = {
    building_id: number;
    building_name: string;
};

export type RejectApprovalParams = {
    id: number;
};

export type AcceptApprovalParams = {
    id: number;
};

export type Approval = {
    id: number;
    category: number;
    detail_type: number;
    content: string;
    create_at: number;
    updated_at: number;
};

export type getApprovalsResult = Array<Approval>;

interface Approavalable {
    verifyBuildingAddress(params: VerifyBuildingAddressParams): Response<VerifyBuildingAddressResult>;
    getUserApprovals(): Response<getApprovalsResult>;
    rejectUserApproval(params: RejectApprovalParams): Response<string>;
    acceptUserApproval(params: AcceptApprovalParams): Response<string>;
}

export default interface IVillifeApprovalManager extends Approavalable {}
