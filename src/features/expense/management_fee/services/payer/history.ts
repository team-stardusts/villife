import ManagementFeePaymentServiceProvider from "../provider";
import { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";
import { useRecoilState } from "recoil";
import { userBillHistoryState } from "./states/bills";
import StardustDateParser from "../../../../../libs/date_parser";

export default function useManagementFeePaymentHistory() {
    const [userHistory, setUserHistory] = useRecoilState<ManagementFee.ManagementFee[]>(userBillHistoryState);
    const [buildingHistory, setBuildingHistory] = useRecoilState<ManagementFee.ManagementFee[]>(userBillHistoryState);

    const service = new ManagementFeePaymentServiceProvider();

    class PaymentHistory {
        public readonly user: ManagementFee.ManagementFee[] = userHistory;
        public readonly building: ManagementFee.ManagementFee[] = buildingHistory;

        get thisMonthBillOfUser(): ManagementFee.ManagementFee | undefined {
            const today = StardustDateParser.changeGMT(new Date(), "kr");
            const year = today.getFullYear();
            const month = today.getMonth() + 1;

            return this.user.find((data) => data.year === year && data.month === month);
        }

        public async updateHistory(): Promise<void> {
            setUserHistory(await service.getUserManagementFeeBills({}));
        }
    }

    return new PaymentHistory();
}
