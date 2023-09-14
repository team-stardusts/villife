import { Response, ResponseForTest } from "../../types";
import AVillifeServerModule from "../absc";
import IVillifeExpenseRestClient, { Payment } from "./types";

export default class VillifePaymentRestClient extends AVillifeServerModule implements IVillifeExpenseRestClient {
    public async createOrderForm(params: Payment.CreateOrder.Params): Response<Payment.CreateOrder.Result> {
        const url = this.routes.payment.order;

        return await this.requestAuthable<Payment.CreateOrder.Params, Payment.CreateOrder.Result>({
            method: "post",
            url: url,
            data: params,
        });
    }
}
