import { ManagementFee } from "../../../../../../libs/rest_apis/villife/expense/types";
import { UserPaymentManagerBase } from "../types";
import PaymentManager from "./abstract";

export default function useUserManagementFeeManager() {
    class UserPaymentManager extends PaymentManager implements UserPaymentManagerBase {
        readonly isAdmin: boolean = false;
        history: ManagementFee.ManagementFee[] = [];
        unpaidFee: number = 0;

        public updateHistory(): Promise<this> {
            return Promise.resolve(this);
        }
    }

    return new UserPaymentManager();
}
