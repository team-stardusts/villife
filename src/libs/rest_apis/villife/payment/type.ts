import { Response } from "../../types";

export default interface IVillifePaymentRestClient {
    CreateOrderForm(params: Payment.CreateOrder.Params): Response<Payment.CreateOrder.Result>;
}

export namespace Payment {
    export type Order = {
        id: number;
        unique_id: string;
        name: string;
        product_type: "pt_management_fee" | "pt_monthlt_rent";
        price: number;
        status: "created" | "paid" | "cancled";
    };

    export namespace CreateOrder {
        export type Params = {
            product_type: string;
            product_name: string;
            price: number;
        };
        export type Result = Order | null;
    }
}
