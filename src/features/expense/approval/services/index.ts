import { IApprovalService } from "./type";
import VillifeStorage from "../../../../libs/storage";
import VillifeServer from "../../../../libs/rest_apis/villife";
import IVillifeApprovalManager, { getApprovalsResult } from "../../../../libs/rest_apis/villife/approval/types";
import { Response } from "../../../../libs/rest_apis/types";

export default function useApprovalService(): IApprovalService {
    const service: IApprovalService = new ApprovalService();
    return service;
}

class ApprovalService implements IApprovalService {
    private mStroage = VillifeStorage.getInstance();
    private mApi: IVillifeApprovalManager = VillifeServer.getApprovalManager();

    async getExpenseApproval(): Response<getApprovalsResult> {
        return await this.mApi.getUserApprovals();
    }

    async rejectExpenseApproval(request_id: number): Promise<Response<string>> {
        return await this.mApi.rejectUserApproval(request_id);
    }
    async acceptExpenseApproval(request_id: number): Promise<Response<string>> {
        return await this.mApi.acceptUserApproval(request_id);
    }
}
