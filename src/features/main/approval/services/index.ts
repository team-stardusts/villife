import { IApprovalService } from "./type";
import VillifeStorage from "../../../../libs/storage";
import VillifeServer from "../../../../libs/rest_apis/villife";
import { Response } from "../../../../libs/rest_apis/types";
import IVillifeApprovalManager, {
    AcceptApprovalParams,
    RejectApprovalParams,
    getApprovalsResult,
} from "../../../../libs/rest_apis/villife/approval/types";

export default function useApprovalService(): IApprovalService {
    const service: IApprovalService = new ApprovalService();
    return service;
}

class ApprovalService implements IApprovalService {
    private mStroage = new VillifeStorage();
    private mApi: IVillifeApprovalManager = VillifeServer.getApprovalManager();

    async getUserApproval(buildingID: number): Response<getApprovalsResult> {
        return await this.mApi.getUserApprovals(buildingID);
    }

    async rejectUserApproval(params: RejectApprovalParams): Promise<Response<string>> {
        return await this.mApi.rejectUserApproval(params);
    }
    async acceptUserApproval(params: AcceptApprovalParams): Promise<Response<string>> {
        return await this.mApi.acceptUserApproval(params);
    }
}
