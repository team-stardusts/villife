import { Response } from "../../types";

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
        LastestNotiMonth: number;
        LastestNotiYear: number;
        LastestPaidMonth: number;
        LastestPaidYear: number;
        RoomNumber: number;
        TotalUnpaidFee: number;
    };

    export type PaymentInfo = {};
}
