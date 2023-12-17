import { Response } from "../../types";
import AVillifeServerModule from "../absc";
import IVillifeApprovalManager, {
    CheckUserIsWaitingForApprovalResult,
    VerifyBuildingAddressParams,
    VerifyBuildingAddressResult,
    VerifyRoomParams,
    getApprovalsResult,
} from "./types";

class VillifeApprovalManager extends AVillifeServerModule implements IVillifeApprovalManager {
    /**
     * @param verifyBuildingAddress
     * @warn API for checking whether a building is in our database or not.
     */
    public async verifyBuildingAddress(params: VerifyBuildingAddressParams): Response<VerifyBuildingAddressResult> {
        let route: string = this.routes.auth.verifyBuilding;

        return await this.requestAuthable<any, VerifyBuildingAddressResult>({
            method: "post",
            url: route,
            data: params,
        });
    }

    public async getUserApprovals(): Response<getApprovalsResult> {
        let route: string = this.routes.approval.getApprovalRequests;

        return await this.requestAuthable<any, getApprovalsResult>({
            method: "get",
            url: route,
        });
    }
    public async rejectUserApproval(request_id: number): Response<string> {
        let route: string = this.routes.approval.decideApprovalRequest;

        const reqBody = {
            request_id: request_id,
            decision: "reject",
        };

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: reqBody,
        });
    }
    public async acceptUserApproval(request_id: number): Response<string> {
        let route: string = this.routes.approval.decideApprovalRequest;

        const reqBody = {
            request_id: request_id,
            decision: "approve",
        };

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: reqBody,
        });
    }
    public async getExpenseApproval(): Response<getApprovalsResult> {
        let route: string = this.routes.approval.getApprovalRequests;

        return await this.requestAuthable<any, getApprovalsResult>({
            method: "get",
            url: route,
        });
    }
    public async rejectExpenseApproval(request_id: number): Response<string> {
        let route: string = this.routes.approval.decideApprovalRequest;

        const reqBody = {
            request_id: request_id,
            decision: "reject",
        };

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: reqBody,
        });
    }
    public async acceptExpenseApproval(request_id: number): Response<string> {
        let route: string = this.routes.approval.decideApprovalRequest;

        const reqBody = {
            request_id: request_id,
            decision: "approve",
        };

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: reqBody,
        });
    }

    public async checkUserIsWaitingForApproval(
        category: number,
        detailType: number
    ): Response<CheckUserIsWaitingForApprovalResult[]> {
        let route = this.routes.approval.checkUserIsWaitingForApproval;
        const reqBody = {
            category: category,
            detail_type: detailType,
        };

        return await this.requestAuthable<any, CheckUserIsWaitingForApprovalResult[]>({
            method: "post",
            url: route,
            data: reqBody,
        });
    }

    public async verifyRoom(params: VerifyRoomParams): Response<string> {
        let route: string = this.routes.auth.verifyRoom;

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: params,
        });
    }
}

export default VillifeApprovalManager;
