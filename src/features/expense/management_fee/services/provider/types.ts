import { Building } from "../../../../../libs/rest_apis/villife/building/types";
import { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";

export interface ManagementFeePaymentServiceBase extends BuildingInfoGettable, HistoryGettable, Confirmable {}

/* interface IPaymentOrderable {
    createOrder(params: ManagementFee.CreateOrder.Params): Promise<ManagementFee.CreateOrder.Result>;
} */

export interface BuildingInfoGettable {
    getBuildingInfo(buildingID: number): Promise<Building.BuildingInfo | null>;
}

export interface HistoryGettable {
    getBuildingHistory(params: ManagementFee.GetBuildingHistory.Params): Promise<ManagementFee.BuildingRenterHistory[]>;
    getUserHistory(params: ManagementFee.GetUserHistory.Params): Promise<ManagementFee.ManagementFee[]>;
}

export interface Confirmable {
    requestPaymentConfirmation(params: ManagementFee.RequestPamentConfirmaion.Params): Promise<boolean>;
    confirmPayment(params: ManagementFee.ConfirmPayment.Params): Promise<boolean>;
}
