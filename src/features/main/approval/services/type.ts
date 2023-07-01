import { Response } from "../../../../libs/rest_apis/types";
import {
    AcceptApprovalParams,
    RejectApprovalParams,
    getApprovalsResult,
} from "../../../../libs/rest_apis/villife/approval/types";

export interface IApprovalService {
    getUserApproval(): Response<getApprovalsResult>;
    rejectUserApproval(params: RejectApprovalParams): Promise<Response<string>>;
    acceptUserApproval(params: AcceptApprovalParams): Promise<Response<string>>;
}
