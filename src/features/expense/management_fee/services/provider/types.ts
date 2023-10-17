import { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";

export interface IManagementFeePaymentServiceProvider extends HistoryGettable {}

/* interface IPaymentOrderable {
    createOrder(params: ManagementFee.CreateOrder.Params): Promise<ManagementFee.CreateOrder.Result>;
} */

export interface HistoryGettable {
    getBuildingMFHistory(params: ManagementFee.GetBuildingMFHistory.Params): Promise<ManagementFee.ManagementFee[]>;
    getUserMFHistory(params: ManagementFee.GetUserMFHistory.Params): Promise<ManagementFee.ManagementFee[]>;
}
