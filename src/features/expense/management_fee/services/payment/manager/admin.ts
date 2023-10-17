import StardustDateParser from "../../../../../../libs/date_parser";
import { ManagementFee } from "../../../../../../libs/rest_apis/villife/expense/types";
import { AdminPaymentManagerBase } from "../types";
import PaymentManager from "./abstract";

class AdminPaymentManager extends PaymentManager implements AdminPaymentManagerBase {
    readonly isAdmin: boolean = true;
    unpaidFee: number = 0;

    get history() {
        return this._historyState;
    }

    public async updateHistory(): Promise<this> {
        if (this._userInfo === null || this._userInfo.adminInfomation?.selectedBuilding.id === undefined) return this;

        /* const today = StardustDateParser.changeGMT(new Date(), "kr");

        const history = await this._api.getBuildingMFHistory({
            buildingID: this._userInfo.adminInfomation.selectedBuilding.id,
            endMonth: today.getMonth(),
            endYear: today.getFullYear(),
            startMonth: today.getMonth(),
            startYear: today.getFullYear() - 1,
        }); */
        const history = await this._api.getUserMFHistory({});

        this._historyStateSetter(history);

        return this;
    }
}

export default AdminPaymentManager;
