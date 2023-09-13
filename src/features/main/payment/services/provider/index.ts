import VillifeServer from "../../../../../libs/rest_apis/villife";
import AServiceProvider from "../../../../common/hooks/service/provider/absc";
import type { AxiosResponse } from "axios";
import type { Payment } from "../../../../../libs/rest_apis/villife/payment/types";
import { IPaymentServiceProvider } from "./types";

export default class PaymentServiceProvider extends AServiceProvider implements IPaymentServiceProvider {
    protected readonly errorTag = "PAYMENT_SERVICE";
    private readonly _api = VillifeServer.getPaymentRestClient();

    public async createOrder(params: Payment.CreateOrder.Params): Promise<Payment.CreateOrder.Result> {
        const result = await this._api.createOrderForm(params);

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data);
            return null;
        }

        return result.data.data;
    }

    public async getBills(params: Payment.GetBills.Params): Promise<Payment.ManagementFee[]> {
        const result = await this._api.getBills(params);

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data as AxiosResponse);

            return [];
        }

        return result.data.data;
    }

    public async getUserBills(params: Payment.GetUserBills.Params): Promise<Payment.ManagementFee[]> {
        const result = await this._api.getUserBills(params);

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data, "왜 Undefine일까?");

            return [];
        }

        return result.data.data;
    }
}
