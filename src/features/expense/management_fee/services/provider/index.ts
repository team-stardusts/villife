import VillifeServer from "../../../../../libs/rest_apis/villife";
import AServiceProvider from "../../../../common/hooks/service/provider/absc";
import type { AxiosResponse } from "axios";
import type { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";
import { ManagementFeePaymentServiceBase } from "./types";
import { Building } from "../../../../../libs/rest_apis/villife/building/types";

export default class ManagementFeePaymentServiceProvider
    extends AServiceProvider
    implements ManagementFeePaymentServiceBase
{
    protected readonly errorTag = "PAYMENT_SERVICE";
    private readonly _buildingAPI = VillifeServer.getBuildingManager();
    private readonly _expenseAPI = VillifeServer.getExpenseRestClient();

    /* public async createOrder(params: ManagementFee.CreateOrder.Params): Promise<ManagementFee.CreateOrder.Result> {
        const result = await this._api.createOrderForm(params);

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data);
            return null;
        }

        return result.data.data;
    } */

    public async getBuildingInfo(buildingID: number): Promise<Building.BuildingInfo | null> {
        const result = await this._buildingAPI.getBuildingInfo({ buildingID });

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data as AxiosResponse);

            return null;
        }

        return result.data.data;
    }

    public async getBuildingMFHistory(
        params: ManagementFee.GetBuildingMFHistory.Params
    ): Promise<ManagementFee.BuildingRenterMFHistory[]> {
        const result = await this._expenseAPI.getBuildingManagementFeeHistory(params);

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data as AxiosResponse);

            return [];
        }

        if (result.data.data === null) {
            console.warn("[getBuildingMFHistory]", null);

            return [];
        }

        return result.data.data;
    }

    public async getUserMFHistory(
        params: ManagementFee.GetUserMFHistory.Params
    ): Promise<ManagementFee.ManagementFee[]> {
        const result = await this._expenseAPI.getUserManagementFeeHistory(params);

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data, "왜 Undefine일까?");

            return [];
        }

        return result.data.data;
    }
}
