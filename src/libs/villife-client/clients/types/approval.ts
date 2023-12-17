import VillifeParking from "./parking";

namespace VillifeApproval {
    export interface Client {
        checkUserIsWaitingForApproval<T>(category: number, detailType: number): Promise<WaitedRequest<T>[]>;
    }

    export type WaitedRequest<T> = {
        category: number;
        detailType: number;
        content: T;
    };
}

export default VillifeApproval;
