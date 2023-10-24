import { ManagementFee } from "../../../../../../libs/rest_apis/villife/expense/types";
import { UserPaymentManagerBase } from "../types";
import PaymentManager from "./abstract";

class UserPaymentManager extends PaymentManager implements UserPaymentManagerBase {
    readonly isAdmin: boolean = false;
    //history: ManagementFee.ManagementFee[] = [];
    unpaidFee: number = 0;

    public async updateHistory(): Promise<this> {
        if (this._userInfo === null) return this;

        const history = await this._api.getUserMFHistory({});

        this._historyStateSetter(history.filter((v) => v.is_paid !== undefined));

        return this;
    }
}

export default UserPaymentManager;
