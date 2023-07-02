import { Response } from "../../../../libs/rest_apis/types";
import { getApprovalsResult } from "../../../../libs/rest_apis/villife/approval/types";

export interface IApprovalService {
    getUserApproval(): Response<getApprovalsResult>;
    rejectUserApproval(request_id: number): Promise<Response<string>>;
    acceptUserApproval(request_id: number): Promise<Response<string>>;
}
