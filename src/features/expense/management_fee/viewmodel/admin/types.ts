import Villife from "../../../../../libs/villife-client/types";
import { UserInfo } from "../../../../common/hooks/service/user_info/types";
import { ViewModel } from "../../../../common/model/types";
import { UserManagementFee } from "../renter/types";

export type BuildingMFHistory = Villife.Expense.BuildingMFHistory;

export interface AdminMFViewModelBase extends ViewModel<BuildingMFHistory[]> {
    user: UserInfo;
    update(): Promise<void>;
    getBuildingInfo(): Promise<Villife.Contract.Building | null>;
    confirmPaymentRequest(params: PaymentConfirmationForm): Promise<ConfirmPaymentResult>;
}

export type PaymentConfirmationForm = {
    unpaidBills: UserManagementFee[];
};

export type ConfirmPaymentResult = {
    [index: string]: UserManagementFee[];
    succeeds: UserManagementFee[];
    failures: UserManagementFee[];
};
