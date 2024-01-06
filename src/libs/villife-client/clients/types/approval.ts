namespace VillifeApproval {
    export interface Client {
        makeDecisionOfApproval(requestId: number, decision: ApprovalDecision): Promise<string>;
        checkUserIsWaitingForApproval<T>(category: number, detailType: number): Promise<WaitedRequest<T>[]>;
        getExpenseApprovals(): Promise<Approval[]>;
        getAllApprovals(): Promise<Approval[]>;
        verifyBuildingAddress(address: string): Promise<VerifiedBuildingAddress>;
        verifyRoom(params: RoomVerifyForm): Promise<string>;
    }

    export type Approval = {
        id: number;
        category: number;
        detailType: number;
        createAt: number;
        updatedAt: number;
        content: string;
    };

    export type ApprovalDecision = "approve" | "reject";

    export type VerifiedBuildingAddress = {
        buildingId: number;
        buildingName: string;
    };

    export type RoomVerifyForm = {
        buildingId: number;
        roomNumber: number;
    };

    export type WaitedRequest<T> = {
        category: number;
        detailType: number;
        content: T;
    };
}

export default VillifeApproval;
