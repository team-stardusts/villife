import { SetterOrUpdater, useRecoilState } from "recoil";
import useUserInformation from "../../../../common/hooks/service/user_info";
import { UserInfo } from "../../../../common/hooks/service/user_info/types";
import ViewModelCommmon from "../../../../common/model/absc";
import { PaymentBill, PaymentConfirmaionRequestForm, RenterMFViewModelBase, UserManagementFee } from "./types";
import Villife from "../../../../../libs/villife-client/types";
import { userManagementFeesState } from "./states";

export default function useRenterMFViewModel(): RenterMFViewModelBase {
    const user = useUserInformation() as UserInfo;
    const [userMFs, setUserMFs] = useRecoilState(userManagementFeesState);

    class RenterMFViewModel extends ViewModelCommmon<UserManagementFee[]> implements RenterMFViewModelBase {
        private _api: Villife.Expense.Client;

        constructor(user: UserInfo, data: UserManagementFee[], setData: SetterOrUpdater<UserManagementFee[]>) {
            super(user, "expense-user-management-fee", data, setData);
            this._api = this._clientInstance.expense;
        }

        public override async update(): Promise<void> {
            this._api
                .getUserMFHistory()
                .then(async (r) => {
                    this.save(r ?? []);
                })
                .catch(async (err) => {
                    console.error("[USER_MF_VIEWMODEL]", "occured while update data.", err);
                    this.save((await this.restore()) ?? []);
                });
        }

        public calcByPaymentItem(history: UserManagementFee[]): PaymentBill {
            const bill = { currentMonthlyCharge: 0, feeToPay: 0, lateFee: 0, unpaidFee: 0 };

            // currentMonthlyCharge: number; // 당월 부과액
            // feeToPay: number; // 지불해야할 총액
            // lateFee: number; // 연체 이자료
            // unpaidFee: number; // 미납액
            history.forEach((f, i) => {
                if (i === history.length - 1) {
                    bill.currentMonthlyCharge = f.amountWon;

                    if (!f.isPaid) {
                        bill.lateFee += f.overdueInterest;
                        bill.feeToPay = f.amountWon;
                    }
                } else if (!f.isPaid) {
                    bill.unpaidFee += f.amountWon;
                    bill.lateFee += f.overdueInterest;
                }
                f.detailBill;
            });

            bill.feeToPay += bill.lateFee + bill.unpaidFee;

            return bill;
        }

        public async getBuildingInfo(): Promise<Villife.Contract.Building | null> {
            return this._clientInstance.contract.getBuilding(this.user.buildingID as number).catch((err) => {
                console.error(err);
                return null;
            });
        }

        public async requestPaymentConfirmation(params: PaymentConfirmaionRequestForm): Promise<any> {
            return this._api
                .requestPamentConfirmaion({
                    ...params,
                    roomId: this.user.roomID as number,
                    roomNumber: this.user.roomNumber as number,
                })
                .then(() => true)
                .catch((err) => {
                    console.error(err);
                    return false;
                });
        }
    }

    return new RenterMFViewModel(user, userMFs, setUserMFs);
}
