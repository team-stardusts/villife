import { Building } from "../../../../../libs/rest_apis/villife/building/types";
import { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";

export interface ManagementFeePaymentServiceBase extends BuildingInfoGettable, HistoryGettable {}

/* interface IPaymentOrderable {
    createOrder(params: ManagementFee.CreateOrder.Params): Promise<ManagementFee.CreateOrder.Result>;
} */

export interface BuildingInfoGettable {
    getBuildingInfo(buildingID: number): Promise<Building.BuildingInfo | null>;
}

export interface HistoryGettable {
    getBuildingMFHistory(
        params: ManagementFee.GetBuildingMFHistory.Params
    ): Promise<ManagementFee.BuildingRenterMFHistory[]>;
    getUserMFHistory(params: ManagementFee.GetUserMFHistory.Params): Promise<ManagementFee.ManagementFee[]>;
}
