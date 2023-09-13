import { Payment } from "../../../../../libs/rest_apis/villife/payment/types";

export interface IPaymentServiceProvider extends IPaymentOrderable, IBillGettable {}

interface IPaymentOrderable {
    createOrder(params: Payment.CreateOrder.Params): Promise<Payment.CreateOrder.Result>;
}

interface IBillGettable {
    getBills(params: Payment.GetBills.Params): Promise<Payment.ManagementFee[]>;
    getUserBills(params: Payment.GetUserBills.Params): Promise<Payment.ManagementFee[]>;
}
