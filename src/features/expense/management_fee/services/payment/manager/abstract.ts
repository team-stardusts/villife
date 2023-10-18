import { SetterOrUpdater } from "recoil";
import { BuildingMFHistory, UserMFHistory } from "../state/types";
import ManagementFeePaymentServiceProvider from "../../provider";
import { UserInfo } from "../../../../../common/hooks/service/user_info/types";

abstract class PaymentManager {
    protected readonly _api = new ManagementFeePaymentServiceProvider();
    protected readonly _userInfo: UserInfo | null;
    protected readonly _historyState: any;
    protected readonly _historyStateSetter: SetterOrUpdater<any>;

    constructor(userInfo: UserInfo | null, historyState: any, historyStateSetter: SetterOrUpdater<any>) {
        this._userInfo = userInfo;
        this._historyState = historyState;
        this._historyStateSetter = historyStateSetter;
    }
}

export default PaymentManager;
