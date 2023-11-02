import { Building } from "../../../../../../libs/rest_apis/villife/building/types";
import { ManagementFee } from "../../../../../../libs/rest_apis/villife/expense/types";
import { SimpleBuildingInfo } from "../../../../../../libs/rest_apis/villife/user_info/types";
import { UserInfo } from "../../../../../common/hooks/service/user_info/types";
import { AdminPaymentManagerBase, AdminRequestMFPaymentConfirmationParams } from "../types";
import PaymentManager from "./abstract";

class AdminPaymentManager extends PaymentManager implements AdminPaymentManagerBase {
    public readonly isAdmin: boolean = true;

    get user(): UserInfo | null {
        return this._userInfo;
    }

    get selectedBuilding(): SimpleBuildingInfo | undefined {
        return this._userInfo?.adminInfomation?.selectedBuilding;
    }

    public async getBuildingDetailInfo(): Promise<Building.BuildingInfo | null> {
        if (this._userInfo === null || this._userInfo.adminInfomation?.selectedBuilding.id === undefined) return null;

        return this._api.getBuildingInfo(this._userInfo.adminInfomation.selectedBuilding.id);
    }

    public async requestPaymentConfirmation(
        params: AdminRequestMFPaymentConfirmationParams
    ): Promise<ManagementFee.ManagementFee[]> {
        if (this._userInfo === null || this._userInfo.adminInfomation?.selectedBuilding.id === undefined) {
            console.warn(
                "[AdminPaymentManager]",
                "There is a problem with User information or the selected building value."
            );
            return [];
        }

        if (params?.unpaidBills === undefined) {
            console.warn("[AdminPaymentManager]", "'UnpaidBills' is undefined.");
            return [];
        }

        const failed: ManagementFee.ManagementFee[] = [];

        for (const unpaidBill of params.unpaidBills) {
            const result = await this._api.confirmPayment({
                bill_id: unpaidBill.bill_id,
                building_id: this._userInfo.adminInfomation.selectedBuilding.id,
            });

            !result && failed.push(unpaidBill);
        }

        return failed;
    }

    public async updateHistory(): Promise<this> {
        if (this._userInfo === null || this._userInfo.adminInfomation?.selectedBuilding.id === undefined) return this;

        const history = await this._api.getBuildingHistory({
            buildingID: this._userInfo.adminInfomation.selectedBuilding.id,
        });

        this._historyStateSetter(history);

        return this;
    }
}

export default AdminPaymentManager;
