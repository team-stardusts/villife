import { Response, ResponseForTest } from "../../types";
import AVillifeServerModule from "../absc";
import IVillifePaymentRestClient, { Payment } from "./types";

const dummyData: Payment.GetBills.Result = [
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

export default class VillifePaymentRestClient extends AVillifeServerModule implements IVillifePaymentRestClient {
    public async createOrderForm(params: Payment.CreateOrder.Params): Response<Payment.CreateOrder.Result> {
        const url = this.routes.payment.handleBuildingBill;

        return await this.requestAuthable<Payment.CreateOrder.Params, Payment.CreateOrder.Result>({
            method: "post",
            url: url,
            data: params,
        });
    }

    public async getUserBills(params: Payment.GetUserBills.Params): Response<Payment.GetUserBills.Result> {
        const route = this.routes.payment.handleMyBill;
        const data: Payment.GetUserBills.Data = {
            unpaid_only: params.unpaidOnly ? "yes" : "no",
        };

        return await this.requestAuthable<Payment.GetUserBills.Data, Payment.GetUserBills.Result>({
            method: "get",
            url: route,
            params: data,
        });
    }

    public async getBills(params: Payment.GetBills.Params): ResponseForTest<Payment.GetBills.Result> {
        const _dummy = dummyData.filter((fee) => {
            if (!(fee.year >= params.startYear && fee.year <= params.endYear)) {
                return false;
            }

            if (!(fee.month >= params.startMonth && fee.month <= params.endMonth)) {
                return false;
            }

            return true;
        });
        return await this.requestForTest<Payment.GetBills.Result>(_dummy);
    }
}
