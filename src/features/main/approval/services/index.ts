import { IApprovalService } from "./type";
import VillifeStorage from "../../../../libs/storage";
import VillifeServer from "../../../../libs/rest_apis/villife";
import { Response } from "../../../../libs/rest_apis/types";
import IVillifeApprovalManager, { getApprovalsResult } from "../../../../libs/rest_apis/villife/approval/types";

export default function useApprovalService(): IApprovalService {
    const service: IApprovalService = new ApprovalService();
    return service;
}

class ApprovalService implements IApprovalService {
    private mStroage = VillifeStorage.getInstance();
    private mApi: IVillifeApprovalManager = VillifeServer.getApprovalManager();

    async getUserApproval(): Response<getApprovalsResult> {
        return await this.mApi.getUserApprovals();
    }

    async rejectUserApproval(request_id: number): Promise<Response<string>> {
        return await this.mApi.rejectUserApproval(request_id);
    }
    async acceptUserApproval(request_id: number): Promise<Response<string>> {
        return await this.mApi.acceptUserApproval(request_id);
    }
}
