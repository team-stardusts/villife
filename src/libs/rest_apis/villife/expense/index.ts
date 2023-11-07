import { Response } from "../../types";
import AVillifeServerModule from "../absc";
import IVillifeExpenseRestClient, { ManagementFee } from "./types";

export default class VillifeExpenseRestClient extends AVillifeServerModule implements IVillifeExpenseRestClient {
    public async confirmPayment(params: ManagementFee.ConfirmPayment.Params): Response<string> {
        const route = this.routes.expense.confirmPayment;

        return await this.requestAuthable<ManagementFee.ConfirmPayment.Body, ManagementFee.ConfirmPayment.Result>({
            method: "post",
            url: route,
            data: params,
        });
    }

    public async getUserHistory(
        params: ManagementFee.GetUserHistory.Params
    ): Response<ManagementFee.GetUserHistory.Result> {
        const route = this.routes.expense.handleMyBill;
        const _params: ManagementFee.GetUserHistory.ReqParams = {
            unpaid_only: params.unpaidOnly ? "yes" : "no",
        };

        return await this.requestAuthable<ManagementFee.GetUserHistory.ReqParams, ManagementFee.GetUserHistory.Result>({
            method: "get",
            url: route,
            params: _params,
        });
    }

    public async getBuildingHistory(
        params: ManagementFee.GetBuildingHistory.Params
    ): Response<ManagementFee.GetBuildingHistory.Result> {
        const route = this.routes.expense.handleBuildingBill;
        const _params: ManagementFee.GetBuildingHistory.ReqParams = {
            building_id: params.buildingID,
        };

        return await this.requestAuthable<
            ManagementFee.GetBuildingHistory.ReqParams,
            ManagementFee.GetBuildingHistory.Result
        >({
            method: "get",
            url: route,
            params: _params,
        });
    }

    public async requestPamentConfirmaion(
        params: ManagementFee.RequestPamentConfirmaion.Params
    ): Response<ManagementFee.RequestPamentConfirmaion.Result> {
        const route = this.routes.approval.requestMFPaymentConfirmation;

        return await this.requestAuthable<
            ManagementFee.RequestPamentConfirmaion.Body,
            ManagementFee.RequestPamentConfirmaion.Result
        >({
            method: "post",
            url: route,
            data: params,
        });
    }
    public async undoManagementFeeRenterTest(): Response<string> {
        const route = this.routes.test.testExpense;

        return await this.requestAuthable<any, string>({
            method: "get",
            url: route,
        });
    }
}

/* const dummyData: ManagementFee.GetBuildingMFHistory.Result = [
    {
        bill_id: 1,
        category: "hello",
        is_paid: true,
        year: 2022,
        month: 8,
        amount_won: 100000,
        payment_info: {},
    },
    {
        bill_id: 2,
        category: "hello",
        is_paid: true,
        year: 2022,
        month: 9,
        amount_won: 100000,
        payment_info: {},
    },
    {
        bill_id: 3,
        category: "hello",
        is_paid: true,
        year: 2022,
        month: 10,
        amount_won: 100000,
        payment_info: {},
    },
    {
        bill_id: 4,
        category: "hello",
        is_paid: true,
        year: 2022,
        month: 11,
        amount_won: 100000,
        payment_info: {},
    },
    {
        bill_id: 5,
        category: "hello",
        is_paid: true,
        year: 2022,
        month: 12,
        amount_won: 100000,
        payment_info: {},
    },
    {
        bill_id: 6,
        category: "hello",
        is_paid: true,
        year: 2023,
        month: 1,
        amount_won: 100000,
        payment_info: {},
    },
    {
        bill_id: 7,
        category: "hello",
        is_paid: true,
        year: 2023,
        month: 2,
        amount_won: 100000,
        payment_info: {},
    },
    {
        bill_id: 8,
        category: "hello",
        is_paid: true,
        year: 2023,
        month: 3,
        amount_won: 100000,
        payment_info: {},
    },
    {
        bill_id: 9,
        category: "hello",
        is_paid: true,
        year: 2023,
        month: 4,
        amount_won: 100000,
        payment_info: {},
    },
    {
        bill_id: 10,
        category: "hello",
        is_paid: true,
        year: 2023,
        month: 5,
        amount_won: 100000,
        payment_info: {},
    },
    {
        bill_id: 11,
        category: "hello",
        is_paid: true,
        year: 2023,
        month: 6,
        amount_won: 100000,
        payment_info: {},
    },
    {
        bill_id: 12,
        category: "hello",
        is_paid: true,
        year: 2023,
        month: 7,
        amount_won: 100000,
        payment_info: {},
    },
    {
        bill_id: 13,
        category: "hello",
        is_paid: true,
        year: 2023,
        month: 8,
        amount_won: 100000,
        payment_info: {},
    },
    {
        bill_id: 14,
        category: "hello",
        is_paid: false,
        year: 2023,
        month: 9,
        amount_won: 100000,
        payment_info: {},
    },
];
 */
