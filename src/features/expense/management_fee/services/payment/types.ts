import { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";

export type ManagementFeeManager = UserPaymentManagerBase | AdminPaymentManagerBase;

export interface UserPaymentManagerBase extends PaymentManagerBase {
    unpaidFee: number;
}

export interface AdminPaymentManagerBase extends PaymentManagerBase {}

export interface PaymentManagerBase extends History<any> {
    readonly isAdmin: boolean;
}

export interface History<THistory> {
    history: Array<THistory>;
    updateHistory(): Promise<this>;
    //getHistory(params: Params): Promise<Pageable<Returns>>;
}

export interface PaymentManageable {
    confirmPayment(params: any): Promise<boolean>;
}

/* export interface Payable<Params, Returns> {
    pay(params: Params): Promise<Returns>;
} */

//export type Pageable<TObj> = Array<TObj>;
