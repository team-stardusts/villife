import { objectToCamel } from "ts-case-convert";
import VillifeClientCommon from "../absc";
import Villife from "../types";

class VillifeApprovalClient extends VillifeClientCommon implements Villife.Approval.Client {
    public async makeDecisionOfApproval(
        requestId: number,
        decistion: Villife.Approval.ApprovalDecision
    ): Promise<string> {
        return this.requestWithCredential({
            method: "post",
            url: this._routes.approval.decideApprovalRequest,
            data: {
                requestId,
                decision: decistion,
            },
        });
    }

    public async checkUserIsWaitingForApproval<T>(
        category: number,
        detailType: number
    ): Promise<Villife.Approval.WaitedRequest<T>[]> {
        return await this.requestWithCredential<any, Villife.Approval.WaitedRequest<string>[]>({
            method: "post",
            url: this._routes.approval.checkUserIsWaitingForApproval,
            data: {
                category,
                detailType,
            },
        }).then((r) => {
            if (r === undefined) return [];

            return r.map((v: Villife.Approval.WaitedRequest<string>) => {
                return {
                    category: v.category,
                    content: objectToCamel(JSON.parse(v.content)) as T,
                    detailType: v.detailType,
                };
            });
        });
    }

    public async getAllApprovals(): Promise<Villife.Approval.Approval[]> {
        return this.requestWithCredential({
            method: "get",
            url: this._routes.approval.getApprovalRequests,
        });
    }

    public async getExpenseApprovals(): Promise<Villife.Approval.Approval[]> {
        return this.requestWithCredential({
            method: "get",
            url: this._routes.approval.requestMFPaymentConfirmation,
        });
    }

    public async verifyBuildingAddress(address: string): Promise<Villife.Approval.VerifiedBuildingAddress> {
        return this.requestWithCredential({
            method: "post",
            url: this._routes.auth.verifyBuilding,
            data: {
                address,
            },
        });
    }

    public async verifyRoom(params: Villife.Approval.RoomVerifyForm): Promise<string> {
        return this.requestWithCredential({
            method: "post",
            url: this._routes.auth.verifyRoom,
            data: params,
        });
    }
}

export default VillifeApprovalClient;
