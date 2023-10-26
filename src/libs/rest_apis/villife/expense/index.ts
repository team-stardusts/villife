import { Response } from "../../types";
import AVillifeServerModule from "../absc";
import IVillifeExpenseRestClient, { ManagementFee } from "./types";

export default class VillifeExpenseRestClient extends AVillifeServerModule implements IVillifeExpenseRestClient {
    public async getUserManagementFeeHistory(
        params: ManagementFee.GetUserMFHistory.Params
    ): Response<ManagementFee.GetUserMFHistory.Result> {
        const route = this.routes.expense.handleMyBill;
        const _params: ManagementFee.GetUserMFHistory.ReqParams = {
            unpaid_only: params.unpaidOnly ? "yes" : "no",
        };

        return await this.requestAuthable<
            ManagementFee.GetUserMFHistory.ReqParams,
            ManagementFee.GetUserMFHistory.Result
        >({
            method: "get",
            url: route,
            params: _params,
        });
    }

    public async getBuildingManagementFeeHistory(
        params: ManagementFee.GetBuildingMFHistory.Params
    ): Response<ManagementFee.GetBuildingMFHistory.Result> {
        const route = this.routes.expense.handleBuildingBill;
        const _params: ManagementFee.GetBuildingMFHistory.ReqParams = {
            building_id: params.buildingID,
        };

        return await this.requestAuthable<
            ManagementFee.GetBuildingMFHistory.ReqParams,
            ManagementFee.GetBuildingMFHistory.Result
        >({
            method: "get",
            url: route,
            params: _params,
        });
    }

    public async requestMFPamentConfirmaion(
        params: ManagementFee.RequestMFPamentConfirmaion.Params
    ): Response<ManagementFee.RequestMFPamentConfirmaion.Result> {
        const route = this.routes.approval.requestMFPaymentConfirmation;

        return await this.requestAuthable<
            ManagementFee.RequestMFPamentConfirmaion.Body,
            ManagementFee.RequestMFPamentConfirmaion.Result
        >({
            method: "post",
            url: route,
            data: params,
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
