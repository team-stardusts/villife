import { Response } from "../../../../libs/rest_apis/types";
import { getApprovalsResult } from "../../../../libs/rest_apis/villife/approval/types";

export interface IApprovalService {
    getExpenseApproval(): Response<getApprovalsResult>;
    rejectExpenseApproval(request_id: number): Promise<Response<string>>;
    acceptExpenseApproval(request_id: number): Promise<Response<string>>;
}
