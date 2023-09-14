import VillifeServer from "../../../../../libs/rest_apis/villife";
import AServiceProvider from "../../../../common/hooks/service/provider/absc";
import type { AxiosResponse } from "axios";
import type { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";
import { IManagementFeePaymentServiceProvider } from "./types";

export default class ManagementFeePaymentServiceProvider
    extends AServiceProvider
    implements IManagementFeePaymentServiceProvider
{
    protected readonly errorTag = "PAYMENT_SERVICE";
    private readonly _api = VillifeServer.getExpenseRestClient();

    /* public async createOrder(params: ManagementFee.CreateOrder.Params): Promise<ManagementFee.CreateOrder.Result> {
        const result = await this._api.createOrderForm(params);

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data);
            return null;
        }

        return result.data.data;
    } */

    public async getManagementFeeBills(
        params: ManagementFee.GetManagementFeeBills.Params
    ): Promise<ManagementFee.ManagementFee[]> {
        const result = await this._api.getManagementFeeBills(params);

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data as AxiosResponse);

            return [];
        }

        return result.data.data;
    }

    public async getUserManagementFeeBills(
        params: ManagementFee.GetUserManagementFeeBills.Params
    ): Promise<ManagementFee.ManagementFee[]> {
        const result = await this._api.getUserManagementFeeBills(params);

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data, "왜 Undefine일까?");

            return [];
        }

        return result.data.data;
    }
}
