import Villife from "../../../../../libs/villife-client/types";
import { UserInfo } from "../../../../common/hooks/service/user_info/types";
import { ViewModel } from "../../../../common/model/types";

export type UserManagementFee = Villife.Expense.ManagementFee;

export interface RenterMFViewModelBase extends ViewModel<UserManagementFee[]> {
    user: UserInfo;
    update(): Promise<void>;
    getBuildingInfo(): Promise<Villife.Contract.Building | null>;
    requestPaymentConfirmation(params: PaymentConfirmaionRequestForm): Promise<boolean>;
    calcByPaymentItem(history: UserManagementFee[]): PaymentBill;
}

export type PaymentConfirmaionRequestForm = {
    amountWon: Villife.Expense.PaymentConfirmaionRequestForm["amountWon"];
    billIds: Villife.Expense.PaymentConfirmaionRequestForm["billIds"];
    depositorName: Villife.Expense.PaymentConfirmaionRequestForm["depositorName"];
};

export type PaymentBill = {
    currentMonthlyCharge: number; // 당월 부과액
    feeToPay: number; // 지불해야할 총액
    lateFee: number; // 연체 이자
    unpaidFee: number; // 미납액
};
