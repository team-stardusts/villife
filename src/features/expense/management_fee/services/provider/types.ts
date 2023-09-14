import { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";

export interface IManagementFeePaymentServiceProvider extends IPaymentOrderable, IBillGettable {}

interface IPaymentOrderable {
    createOrder(params: ManagementFee.CreateOrder.Params): Promise<ManagementFee.CreateOrder.Result>;
}

interface IBillGettable {
    getManagementFeeBills(params: ManagementFee.GetManagementFeeBills.Params): Promise<ManagementFee.ManagementFee[]>;
    getUserManagementFeeBills(
        params: ManagementFee.GetUserManagementFeeBills.Params
    ): Promise<ManagementFee.ManagementFee[]>;
}
