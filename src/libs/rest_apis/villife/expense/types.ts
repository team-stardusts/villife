import { Response } from "../../types";

export default interface IVillifeExpenseRestClient
    extends ManagementFee.ManagementFeeHistoryGettable,
        ManagementFee.ManagementFeeConfrimationRequestable {}

export namespace ManagementFee {
    export interface ManagementFeeHistoryGettable {
        getBuildingManagementFeeHistory(params: GetBuildingMFHistory.Params): Response<GetBuildingMFHistory.Result>;
        getUserManagementFeeHistory(params: GetUserMFHistory.Params): Response<GetUserMFHistory.Result>;
    }

    export interface ManagementFeeConfrimationRequestable {
        requestMFPamentConfirmaion(
            param: RequestMFPamentConfirmaion.Params
        ): Response<RequestMFPamentConfirmaion.Result>;
    }

    export namespace RequestMFPamentConfirmaion {
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
        };

        export type ReqParams = {
            building_id: number;
        };

        export type Result = BuildingRenterMFHistory[];
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

    export type BuildingRenterMFHistory = {
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
    };

    export type PaymentInfo = {};
}
