import { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";

export interface IManagementFeePaymentServiceProvider extends IBillGettable {}

/* interface IPaymentOrderable {
    createOrder(params: ManagementFee.CreateOrder.Params): Promise<ManagementFee.CreateOrder.Result>;
} */

export interface IBillGettable {
    getManagementFeeBills(params: ManagementFee.GetBuildingMFHistory.Params): Promise<ManagementFee.ManagementFee[]>;
    getUserManagementFeeBills(params: ManagementFee.GetUserMFHistory.Params): Promise<ManagementFee.ManagementFee[]>;
}
