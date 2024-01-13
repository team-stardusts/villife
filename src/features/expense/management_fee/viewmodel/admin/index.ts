import { SetterOrUpdater, useRecoilState } from "recoil";
import { AdminMFViewModelBase, BuildingMFHistory, ConfirmPaymentResult, PaymentConfirmationForm } from "./types";
import { buildingMFHistoryState } from "./states";
import useUserInformation from "../../../../common/hooks/service/user_info";
import { UserInfo } from "../../../../common/hooks/service/user_info/types";
import ViewModelCommmon from "../../../../common/model/absc";
import { Villife } from "@team-stardusts/villife-client";

export default function useAdminMFViewModel(): AdminMFViewModelBase {
    const user = useUserInformation() as UserInfo;
    const [mfs, setMFs] = useRecoilState(buildingMFHistoryState);

    class AdminMFViewModel extends ViewModelCommmon<BuildingMFHistory[]> implements AdminMFViewModelBase {
        private _api: Villife.Expense.Client;

        constructor(user: UserInfo, data: BuildingMFHistory[], setData: SetterOrUpdater<BuildingMFHistory[]>) {
            super(user, "expense-admin-management-fee", data, setData);
            this._api = this._clientInstance.expense;
        }

        public override async update(): Promise<void> {
            if (!this.user?.adminInfomation?.selectedBuilding.id) {
                this.save([]);
                return;
            }

            this._api
                .getBuildingMFHistory(this.user.adminInfomation.selectedBuilding.id)
                .then(async (r) => {
                    this.save(r ?? []);
                })
                .catch(async (err) => {
                    console.error("[ADMIN_MF_VIEWMODEL]", "occured while update data.", err);
                    this.save((await this.restore()) ?? []);
                });
        }

        public async getBuildingInfo(): Promise<Villife.Contract.Building | null> {
            if (!this.user.adminInfomation?.selectedBuilding.id) {
                return null;
            }

            return this._clientInstance.contract
                .getBuilding(this.user.adminInfomation?.selectedBuilding.id)
                .catch((err) => {
                    console.error("[ADMIN_MF_VIEWMODEL]", "occured while getting building info.", err);
                    return null;
                });
        }

        public async confirmPaymentRequest(params: PaymentConfirmationForm): Promise<ConfirmPaymentResult> {
            const result: ConfirmPaymentResult = {
                succeeds: [],
                failures: [],
            };

            if (params.unpaidBills.length === 0) {
                console.warn("[AdminPaymentManager]", "'UnpaidBills' is empty.");
                return result;
            }

            if (this.user === null || this.user.adminInfomation?.selectedBuilding.id === undefined) {
                console.warn(
                    "[AdminPaymentManager]",
                    "There is a problem with User information or the selected building value."
                );
                result.failures = params.unpaidBills;
                return result;
            }

            for (const unpaidBill of params.unpaidBills) {
                const isSuccessful = await this._api.confirmPayment({
                    billId: unpaidBill.billId,
                    buildingId: this.user.adminInfomation.selectedBuilding.id,
                });

                result[isSuccessful ? "succeeds" : "failures"].push(unpaidBill);
            }

            return result;
        }

        public async sendMessage(params: Villife.Messaging.MessageForm): Promise<boolean> {
            return this._clientInstance.messaging.sendMessage(params);
        }
    }

    return new AdminMFViewModel(user, mfs, setMFs);
}
