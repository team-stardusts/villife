import { Building } from "../../../../../../libs/rest_apis/villife/building/types";
import { SimpleBuildingInfo } from "../../../../../../libs/rest_apis/villife/user_info/types";
import { AdminPaymentManagerBase } from "../types";
import PaymentManager from "./abstract";

class AdminPaymentManager extends PaymentManager implements AdminPaymentManagerBase {
    public readonly isAdmin: boolean = true;

    get selectedBuilding(): SimpleBuildingInfo | undefined {
        return this._userInfo?.adminInfomation?.selectedBuilding;
    }

    public async getBuildingDetailInfo(): Promise<Building.BuildingInfo | null> {
        if (this._userInfo === null || this._userInfo.adminInfomation?.selectedBuilding.id === undefined) return null;

        return this._api.getBuildingInfo(this._userInfo.adminInfomation.selectedBuilding.id);
    }

    public async updateHistory(): Promise<this> {
        if (this._userInfo === null || this._userInfo.adminInfomation?.selectedBuilding.id === undefined) return this;

        const history = await this._api.getBuildingMFHistory({
            buildingID: this._userInfo.adminInfomation.selectedBuilding.id,
        });

        this._historyStateSetter(history);

        return this;
    }
}

export default AdminPaymentManager;
