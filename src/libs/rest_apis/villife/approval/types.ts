import { Response } from "../../types";

export type VerifyBuildingAddressParams = {
    address: string;
};

export type VerifyBuildingAddressResult = {
    building_id: number;
    building_name: string;
};

export type RejectApprovalParams = {
    approval_id: number;
};

export type AcceptApprovalParams = {
    approval_id: number;
};

export type Approval = {
    id: number;
    content: string;
    category: string;
    requester_id: number;
    approval_id: number;
    building_name: string;
    title: string;
};

export type getApprovalsResult = Array<Approval>;

interface Approavalable {
    verifyBuildingAddress(params: VerifyBuildingAddressParams): Response<VerifyBuildingAddressResult>;
    getUserApprovals(buildingID: number): Response<getApprovalsResult>;
    rejectUserApproval(params: RejectApprovalParams): Response<string>;
    acceptUserApproval(params: AcceptApprovalParams): Response<string>;
}

export default interface IVillifeApprovalManager extends Approavalable {}
