import { Response } from "../../types";

export default interface IVillifeExpenseRestClient extends ManagementFee.HistoryGettable, ManagementFee.Confirmable {}

export namespace ManagementFee {
    export interface HistoryGettable {
        getBuildingHistory(params: GetBuildingHistory.Params): Response<GetBuildingHistory.Result>;
        getUserHistory(params: GetUserHistory.Params): Response<GetUserHistory.Result>;
    }

    export interface Confirmable {
        requestPamentConfirmaion(param: RequestPamentConfirmaion.Params): Response<RequestPamentConfirmaion.Result>;
        confirmPayment(params: ConfirmPayment.Params): Response<ConfirmPayment.Result>;
        undoManagementFeeRenterTest(): Response<string>;
    }

    export namespace ConfirmPayment {
        export type Params = {
            bill_id: number;
            building_id: number;
        };

        export type Body = Params;

        export type Result = string;
    }

    export namespace RequestPamentConfirmaion {
        export type Params = {
            amount_won: number;
            bill_ids: number[];
            depositor_name: string;
            room_id: number;
            room_number: number;
        };

        export type Body = Params;

        export type Result = string;
    }

    export namespace GetUserHistory {
        export type Params = {
            unpaidOnly?: true;
        };

        export type ReqParams = {
            unpaid_only: "yes" | "no";
        };

        export type Result = ManagementFee[];
    }

    export namespace GetBuildingHistory {
        export type Params = {
            buildingID: number;
        };

        export type ReqParams = {
            building_id: number;
        };

        export type Result = BuildingRenterHistory[];
    }

    export type ManagementFee = {
        amount_won: number;
        bill_id: number;
        category: string;
        detail_bill: string;
        form_id: number;
        is_paid: boolean;
        month: number;
        overdue_interest: number;
        payment_info: PaymentInfo;
        year: number;
    };

    export type BuildingRenterHistory = {
        /* lastestNotiMonth: number;
        lastestNotiYear: number;
        lastestPaidMonth: number;
        lastestPaidYear: number;
        roomNumber: number;
        totalUnpaidFee: number; */
        lastest_noti_month: number;
        lastest_noti_year: number;
        lastest_paid_month: number;
        lastest_paid_year: number;
        room_number: number;
        total_unpaid_fee: number;
        unpaid_bills: ManagementFee[];
    };

    export type PaymentInfo = {};
}
