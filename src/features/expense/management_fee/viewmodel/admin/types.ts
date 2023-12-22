import Villife from "../../../../../libs/villife-client/types";
import { UserInfo } from "../../../../common/hooks/service/user_info/types";
import { ViewModel } from "../../../../common/model/types";
import { UserManagementFee } from "../renter/types";

export type BuildingMFHistory = Villife.Expense.BuildingMFHistory;

export interface AdminMFViewModelBase extends ViewModel<BuildingMFHistory[]> {
    user: UserInfo;
    update(): Promise<void>;
    confirmPaymentRequest(params: PaymentConfirmationForm): Promise<ConfirmPaymentResult>;
    getBuildingInfo(): Promise<Villife.Contract.Building | null>;
    sendMessage(params: Villife.Messaging.MessageForm): Promise<boolean>;
}

export type PaymentConfirmationForm = {
    unpaidBills: UserManagementFee[];
};

export type ConfirmPaymentResult = {
    [index: string]: UserManagementFee[];
    succeeds: UserManagementFee[];
    failures: UserManagementFee[];
};
