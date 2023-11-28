import VillifeServer from "../../../../../libs/rest_apis/villife";
import AServiceProvider from "../../../../common/hooks/service/provider/absc";
import type { AxiosResponse } from "axios";
import type { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";
import { ManagementFeePaymentServiceBase } from "./types";
import { Building } from "../../../../../libs/rest_apis/villife/building/types";
import { MessageData } from "../../../../../libs/rest_apis/villife/message/types";
import { Response } from "../../../../../libs/rest_apis/types";

export default class ManagementFeePaymentServiceProvider
    extends AServiceProvider
    implements ManagementFeePaymentServiceBase
{
    protected readonly errorTag = "PAYMENT_SERVICE";
    private readonly _buildingAPI = VillifeServer.getBuildingManager();
    private readonly _expenseAPI = VillifeServer.getExpenseRestClient();
    private readonly _messageAPI = VillifeServer.getMessageRestClient();

    /* public async createOrder(params: ManagementFee.CreateOrder.Params): Promise<ManagementFee.CreateOrder.Result> {
        const result = await this._api.createOrderForm(params);

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data);
            return null;
        }

        return result.data.data;
    } */

    public async confirmPayment(params: ManagementFee.ConfirmPayment.Params): Promise<boolean> {
        const result = await this._expenseAPI.confirmPayment(params);

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data, result.data?.data);

            return false;
        }

        return true;
    }

    public async getBuildingInfo(buildingID: number): Promise<Building.BuildingInfo | null> {
        const result = await this._buildingAPI.getBuildingInfo({ buildingID });

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data as AxiosResponse);

            return null;
        }

        return result.data.data;
    }

    public async getBuildingHistory(
        params: ManagementFee.GetBuildingHistory.Params
    ): Promise<ManagementFee.BuildingRenterHistory[]> {
        const result = await this._expenseAPI.getBuildingHistory(params);

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

    public async getUserHistory(params: ManagementFee.GetUserHistory.Params): Promise<ManagementFee.ManagementFee[]> {
        const result = await this._expenseAPI.getUserHistory(params);
        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data, "왜 Undefine일까?");

            return [];
        }

        // MF가 없을 시 null 값이 오는 문제로 예외처리
        if (result.data?.data === null) {
            console.log("Management fees are null.");
            return [];
        }

        return result.data.data;
    }

    public async requestPaymentConfirmation(params: ManagementFee.RequestPamentConfirmaion.Params): Promise<boolean> {
        const result = await this._expenseAPI.requestPamentConfirmaion(params);

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data, result.data?.data);

            return false;
        }

        return true;
    }
    public async sendPushMessage(params: MessageData): Promise<Response<string>> {
        const result = await this._messageAPI.sendPushMessage(params);

        return result;
    }
}
