import { ManagementFee } from "../../../../../../libs/rest_apis/villife/expense/types";
import { AdminPaymentManagerBase } from "../types";

export default function useAdminManagementFeeManager() {
    class AdminPaymentManager implements AdminPaymentManagerBase {
        readonly isAdmin: boolean = true;
        history: ManagementFee.ManagementFee[] = [];
        unpaidFee: number = 0;

        public updateHistory(): Promise<this> {
            return Promise.resolve(this);
        }
    }

    return new AdminPaymentManager();
}
