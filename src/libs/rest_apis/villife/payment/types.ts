import { Response, ResponseForTest } from "../../types";

export default interface IVillifePaymentRestClient {
    createOrderForm(params: Payment.CreateOrder.Params): Response<Payment.CreateOrder.Result>;
}

export namespace Payment {
    export type Order = {
        id: number;
        unique_id: string;
        name: string;
        product_type: "pt_management_fee" | "pt_monthlt_rent";
        product_id: number;
        price: number;
        status: "created" | "paid" | "cancled";
    };

    export namespace CreateOrder {
        export type Params = {
            product_id: number;
            product_type: Order["product_type"];
            product_name: string;
            price: number;
            tax_free_amount: number;
        };
        export type Result = Order | null;
    }
}
