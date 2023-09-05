import { Response } from "../../types";
import AVillifeServerModule from "../absc";
import IVillifePaymentRestClient, { Payment } from "./type";

export default class VillifePaymentRestClient extends AVillifeServerModule implements IVillifePaymentRestClient {
    public async CreateOrderForm(params: Payment.CreateOrder.Params): Response<Payment.CreateOrder.Result> {
        const url = this.routes.payment.order;

        return await this.requestAuthable<Payment.CreateOrder.Params, Payment.CreateOrder.Result>({
            method: "post",
            url: url,
            data: params,
        });
    }
}
