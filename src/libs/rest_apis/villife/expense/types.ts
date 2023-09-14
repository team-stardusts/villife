import { Response, ResponseForTest } from "../../types";

export default interface IVillifeExpenseRestClient extends ManagementFee.IManagementFeeBillGettable {}

export namespace ManagementFee {
    export interface IManagementFeeBillGettable {
        getManagementFeeBills(params: GetManagementFeeBills.Params): ResponseForTest<GetManagementFeeBills.Result>;
        getUserManagementFeeBills(params: GetUserManagementFeeBills.Params): Response<GetUserManagementFeeBills.Result>;
    }

    export namespace GetUserManagementFeeBills {
        export type Params = {
            unpaidOnly?: true;
        };

        export type ReqParams = {
            unpaid_only: "yes" | "no";
        };

        export type Result = ManagementFee[];
    }

    export namespace GetManagementFeeBills {
        export type Params = {
            startYear: number;
            endYear: number;
            startMonth: number;
            endMonth: number;
        };

        export type Body = Params;

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
