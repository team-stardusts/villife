import { Response, ResponseForTest } from "../../types";

export default interface IVillifeExpenseRestClient extends ManagementFee.ManagementFeeHistoryGettable {}

export namespace ManagementFee {
    export interface ManagementFeeHistoryGettable {
        getBuildingManagementFeeHistory(params: GetBuildingMFHistory.Params): Response<GetBuildingMFHistory.Result>;
        getUserManagementFeeHistory(params: GetUserMFHistory.Params): Response<GetUserMFHistory.Result>;
    }

    export namespace GetUserMFHistory {
        export type Params = {
            unpaidOnly?: true;
        };

        export type ReqParams = {
            unpaid_only: "yes" | "no";
        };

        export type Result = ManagementFee[];
    }

    export namespace GetBuildingMFHistory {
        export type Params = {
            buildingID: number;
            endMonth: number;
            endYear: number;
            startMonth: number;
            startYear: number;
            unpaidOnly?: boolean;
        };

        export type ReqParams = {
            building_id: number;
            end_month: number;
            end_year: number;
            start_month: number;
            start_year: number;
            unpaid_only?: boolean;
        };

        export type Result = ManagementFee[];
    }

    export type ManagementFee = {
        amount_won: number;
        bill_id: number;
        category: string;
        is_paid: boolean;
        month: number;
        payment_info: PaymentInfo;
        year: number;
    };

    export type PaymentInfo = {};
}
