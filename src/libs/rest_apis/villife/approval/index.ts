import { Response } from "../../types";
import AVillifeServerModule from "../absc";
import IVillifeApprovalManager, {
    VerifyBuildingAddressParams,
    VerifyBuildingAddressResult,
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
}

export default VillifeApprovalManager;
