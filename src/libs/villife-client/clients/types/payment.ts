namespace VillifePayment {
    export interface Client {
        createOrderForm(params: PaymentOrderCreationForm): Promise<PaymentOrder | null>;
    }

    export type PaymentOrder = {
        id: number;
        uniqueId: string;
        name: string;
        productType: PaymentProductType;
        productId: number;
        price: number;
        status: PaymentStatus;
    };

    export type PaymentOrderCreationForm = {
        productId: number;
        productType: PaymentProductType;
        productName: string;
        price: number;
    };

    export type PaymentProductType = "pt_management_fee" | "pt_monthlt_rent";
    export type PaymentStatus = "created" | "paid" | "cancled";
}

export default VillifePayment;
