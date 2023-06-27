import { Response } from "../../types";
import AVillifeServerModule from "../absc";
import IVillifeApprovalManager, {
    AcceptApprovalParams,
    RejectApprovalParams,
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

    public async getUserApprovals(buildingID: number): Response<getApprovalsResult> {
        let route: string = this.routes.approval.getUserApprovals;

        return await this.requestAuthable<any, getApprovalsResult>({
            method: "post",
            url: route,
        });
    }
    public async rejectUserApproval(params: RejectApprovalParams): Response<string> {
        let route: string = this.routes.approval.rejectUserApproval;

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: params,
        });
    }
    public async acceptUserApproval(params: AcceptApprovalParams): Response<string> {
        let route: string = this.routes.approval.acceptUserApproval;
        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: params,
        });
    }
}

export default VillifeApprovalManager;
