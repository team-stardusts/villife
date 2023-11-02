import { Building } from "../../../../../libs/rest_apis/villife/building/types";
import { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";
import { SimpleBuildingInfo } from "../../../../../libs/rest_apis/villife/user_info/types";
import { UserInfo } from "../../../../common/hooks/service/user_info/types";

export type ManagementFeeManager = UserPaymentManagerBase | AdminPaymentManagerBase;

export interface UserPaymentManagerBase extends PaymentManagerBase<ManagementFee.ManagementFee> {}

export interface AdminPaymentManagerBase extends PaymentManagerBase<ManagementFee.BuildingRenterHistory> {
    selectedBuilding: SimpleBuildingInfo | undefined;
}

export interface PaymentManagerBase<THistory> extends MFConfirmable, History<THistory>, BuildingDetailInfoGettable {
    readonly user: UserInfo | null;
    readonly isAdmin: boolean;
}

export interface MFConfirmable {
    requestPaymentConfirmation(params: any): Promise<any>;
}

export type UserRequestMFPaymentConfirmationParams = {
    amountWon: number;
    billIDs: number[];
    sender: string;
};

export type AdminRequestMFPaymentConfirmationParams = {
    unpaidBills: ManagementFee.ManagementFee[];
};

export interface BuildingDetailInfoGettable {
    getBuildingDetailInfo(): Promise<Building.BuildingInfo | null>;
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
