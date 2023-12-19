import { objectToCamel } from "ts-case-convert";
import VillifeClientCommon from "../absc";
import Villife from "../types";

class VillifeApprovalClient extends VillifeClientCommon implements Villife.Approval.Client {
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
}

export default VillifeApprovalClient;
