import { SetterOrUpdater, useRecoilState } from "recoil";
import useUserInformation from "../../../../common/hooks/service/user_info";
import { UserInfo } from "../../../../common/hooks/service/user_info/types";
import ViewModelCommmon from "../../../../common/model/absc";
import { PaymentBill, PaymentConfirmaionRequestForm, RenterMFViewModelBase, UserManagementFee } from "./types";
import { userManagementFeesState } from "./states";
import StardustDateParser from "../../../../../libs/date_parser";
import { Villife } from "@team-stardusts/villife-client";

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
                    if (r === undefined || r === null) return;

                    this.save(this.toViewModel(r));
                })
                .catch(async (err) => {
                    console.error("[USER_MF_VIEWMODEL]", "occured while update data.", err);
                    if (err instanceof Error) {
                        console.error(err.stack);
                    }
                    const restoredData = await this.restore().then((data) => {
                        if (data === null) return [];

                        return data.map((_data) => {
                            const d = _data;
                            d.createdAt = new Date(_data.createdAt);
                            return d;
                        });
                    });

                    this.save(restoredData);
                });
        }

        private toViewModel(data: Villife.Expense.ManagementFee[]): UserManagementFee[] {
            return data.map((v) => {
                const d: any = v;
                d.createdAt = StardustDateParser.deserialize(v.createdAt);
                return d;
            });
        }

        public calcByPaymentItem(history: UserManagementFee[]): PaymentBill {
            // currentMonthlyCharge: number; // 당월 부과액
            // feeToPay: number; // 지불해야할 총액
            // lateFee: number; // 연체 이자료
            // unpaidFee: number; // 미납액
            const bill: PaymentBill = {
                latestBillId: 0,
                currentMonthlyCharge: 0,
                feeToPay: 0,
                lateFee: 0,
                unpaidFee: 0,
            };

            if (!history || history.length === 0) return bill;

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
            bill.latestBillId = history[history.length - 1].billId;
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

        public async isWaitingForConfirmation(): Promise<boolean> {
            return this._clientInstance.approval
                .checkUserIsWaitingForApproval(3, 1)
                .then((r) => {
                    if (r === undefined || r.length === 0) {
                        return false;
                    }
                    return true;
                })
                .catch(() => {
                    return false;
                });
        }
    }

    return new RenterMFViewModel(user, userMFs, setUserMFs);
}
