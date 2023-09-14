import { Response, ResponseForTest } from "../../types";

export default interface IVillifePaymentRestClient
    extends ManagementFee.IPaymentOrderable,
        ManagementFee.IManagementFeeBillGettable {}

export namespace ManagementFee {
    export interface IPaymentOrderable {
        createOrderForm(params: ManagementFee.CreateOrder.Params): Response<ManagementFee.CreateOrder.Result>;
    }

    export interface IManagementFeeBillGettable {
        getManagementFeeBills(params: GetManagementFeeBills.Params): ResponseForTest<GetManagementFeeBills.Result>;
        getUserManagementFeeBills(params: GetUserManagementFeeBills.Params): Response<GetUserManagementFeeBills.Result>;
    }

    export namespace GetUserManagementFeeBills {
        export type Params = {
            unpaidOnly?: true;
        };

        export type ReqParams = {
            unpaid_only: "yes" | "no";
        };

        export type Result = ManagementFee[];
    }

    export namespace GetManagementFeeBills {
        export type Params = {
            startYear: number;
            endYear: number;
            startMonth: number;
            endMonth: number;
        };

        export type Body = Params;

        export type Result = ManagementFee[];
    }

    export type ManagementFee = {
        amount_won: number;
        bill_id: number;
        category: string;
        is_paid: boolean;
        month: number;
        payment_info: PaymentInfo;
        year: number;
    };

    export type PaymentInfo = {};

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
        };
        export type Result = Order | null;
    }
}
