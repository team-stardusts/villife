import { Building } from "../../../../../../libs/rest_apis/villife/building/types";
import { ManagementFee } from "../../../../../../libs/rest_apis/villife/expense/types";
import { UserInfo } from "../../../../../common/hooks/service/user_info/types";
import { RequestMFPaymentConfirmationParams, UserPaymentManagerBase } from "../types";
import PaymentManager from "./abstract";

class UserPaymentManager extends PaymentManager implements UserPaymentManagerBase {
    readonly isAdmin: boolean = false;
    //history: ManagementFee.ManagementFee[] = [];

    get user(): UserInfo | null {
        return this._userInfo;
    }

    public async requestMFPaymentConfirmation(params: RequestMFPaymentConfirmationParams): Promise<boolean> {
        if (this.user?.roomID === undefined || this.user.roomNumber === undefined) {
            return false;
        }

        return await this._api.requestMFPaymentConfirmation({
            bill_ids: params.billIDs,
            amount_won: params.amountWon,
            depositor_name: params.sender,
            room_id: this.user.roomID,
            room_number: this.user.roomNumber,
        });
    }

    public async getBuildingDetailInfo(): Promise<Building.BuildingInfo | null> {
        if (this._userInfo === null || this._userInfo.buildingID === undefined) return null;

        return this._api.getBuildingInfo(this._userInfo.buildingID);
    }

    public async updateHistory(): Promise<this> {
        if (this._userInfo === null) return this;

        const history = await this._api.getUserMFHistory({});

        this._historyStateSetter(history);

        return this;
    }
}

export default UserPaymentManager;
