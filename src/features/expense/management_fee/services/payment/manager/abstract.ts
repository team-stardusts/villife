import { SetterOrUpdater } from "recoil";
import { MFHistory } from "../state/types";
import ManagementFeePaymentServiceProvider from "../../provider";
import { UserInfo } from "../../../../../common/hooks/service/user_info/types";

abstract class PaymentManager {
    protected readonly _api = new ManagementFeePaymentServiceProvider();
    protected readonly _userInfo: UserInfo | null;
    protected readonly _historyState: MFHistory;
    protected readonly _historyStateSetter: SetterOrUpdater<MFHistory>;

    constructor(userInfo: UserInfo | null, historyState: MFHistory, historyStateSetter: SetterOrUpdater<MFHistory>) {
        this._userInfo = userInfo;
        this._historyState = historyState;
        this._historyStateSetter = historyStateSetter;
    }
}

export default PaymentManager;
