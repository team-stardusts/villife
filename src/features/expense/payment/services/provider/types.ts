import { Payment } from "../../../../../libs/rest_apis/villife/expense/types";

export interface IPaymentServiceProvider {
    getPaymentWidgetUrl(params: Payment.CreateOrder.Params): Promise<string | null>;
}
