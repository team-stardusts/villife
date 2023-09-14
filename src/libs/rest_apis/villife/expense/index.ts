import { Response, ResponseForTest } from "../../types";
import AVillifeServerModule from "../absc";
import IVillifeExpenseRestClient, { ManagementFee } from "./types";

const dummyData: ManagementFee.GetManagementFeeBills.Result = [
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

export default class VillifeExpenseRestClient extends AVillifeServerModule implements IVillifeExpenseRestClient {
    public async getUserManagementFeeBills(
        params: ManagementFee.GetUserManagementFeeBills.Params
    ): Response<ManagementFee.GetUserManagementFeeBills.Result> {
        const route = this.routes.expense.handleMyBill;
        const data: ManagementFee.GetUserManagementFeeBills.ReqParams = {
            unpaid_only: params.unpaidOnly ? "yes" : "no",
        };

        return await this.requestAuthable<
            ManagementFee.GetUserManagementFeeBills.ReqParams,
            ManagementFee.GetUserManagementFeeBills.Result
        >({
            method: "get",
            url: route,
            params: data,
        });
    }

    public async getManagementFeeBills(
        params: ManagementFee.GetManagementFeeBills.Params
    ): ResponseForTest<ManagementFee.GetManagementFeeBills.Result> {
        const _dummy = dummyData.filter((fee) => {
            if (!(fee.year >= params.startYear && fee.year <= params.endYear)) {
                return false;
            }

            if (!(fee.month >= params.startMonth && fee.month <= params.endMonth)) {
                return false;
            }

            return true;
        });
        return await this.requestForTest<ManagementFee.GetManagementFeeBills.Result>(_dummy);
    }
}
