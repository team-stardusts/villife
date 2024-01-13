import { Villife } from "@team-stardusts/villife-client";
import { UserInfo } from "../../../../common/hooks/service/user_info/types";
import { ViewModel } from "../../../../common/model/types";

export type UserManagementFee = {
    amountWon: Villife.Expense.ManagementFee["amountWon"];
    billId: Villife.Expense.ManagementFee["billId"];
    category: Villife.Expense.ManagementFee["category"];
    createdAt: Date;
    detailBill: Villife.Expense.ManagementFee["detailBill"];
    formId: Villife.Expense.ManagementFee["formId"];
    isPaid: Villife.Expense.ManagementFee["isPaid"];
    month: Villife.Expense.ManagementFee["month"];
    overdueInterest: Villife.Expense.ManagementFee["overdueInterest"];
    paymentInfo: Villife.Expense.ManagementFee["paymentInfo"];
    year: Villife.Expense.ManagementFee["year"];
};

export interface RenterMFViewModelBase extends ViewModel<UserManagementFee[]> {
    user: UserInfo;
    update(): Promise<void>;
    calcByPaymentItem(history: UserManagementFee[]): PaymentBill;
    getBuildingInfo(): Promise<Villife.Contract.Building | null>;
    requestPaymentConfirmation(params: PaymentConfirmaionRequestForm): Promise<boolean>;
    isWaitingForConfirmation(): Promise<boolean>;
}

export type PaymentConfirmaionRequestForm = {
    amountWon: Villife.Expense.PaymentConfirmaionRequestForm["amountWon"];
    billIds: Villife.Expense.PaymentConfirmaionRequestForm["billIds"];
    depositorName: Villife.Expense.PaymentConfirmaionRequestForm["depositorName"];
};

export type PaymentBill = {
    latestBillId: number;
    currentMonthlyCharge: number; // 당월 부과액
    feeToPay: number; // 지불해야할 총액
    lateFee: number; // 연체 이자
    unpaidFee: number; // 미납액
};
