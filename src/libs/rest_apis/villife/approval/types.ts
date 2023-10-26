import { Response } from "../../types";

export type VerifyBuildingAddressParams = {
    address: string;
};

export type VerifyBuildingAddressResult = {
    building_id: number;
    building_name: string;
};

export type VerifyRoomParams = {
    building_id: number;
    room_number: number;
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

export type CheckUserIsWaitingForApprovalResult = {
    is_waiting: boolean;
};

export type getApprovalsResult = Array<Approval>;

interface Approavalable {
    verifyBuildingAddress(params: VerifyBuildingAddressParams): Response<VerifyBuildingAddressResult>;
    getUserApprovals(): Response<getApprovalsResult>;
    rejectUserApproval(request_id: number): Response<string>;
    acceptUserApproval(request_id: number): Response<string>;
    getExpenseApproval(): Response<getApprovalsResult>;
    rejectExpenseApproval(request_id: number): Response<string>;
    acceptExpenseApproval(request_id: number): Response<string>;
    checkUserIsWaitingForApproval(category: number, detailType: number): Response<CheckUserIsWaitingForApprovalResult>;
    verifyRoom(params: VerifyRoomParams): Response<string>;
    checkUserIsWaitingForApproval(category: number, detailType: number): Response<CheckUserIsWaitingForApprovalResult>;
}

export default interface IVillifeApprovalManager extends Approavalable {}
