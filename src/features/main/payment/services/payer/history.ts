import PaymentServiceProvider from "../provider";
import { Payment } from "../../../../../libs/rest_apis/villife/payment/types";
import { useRecoilState } from "recoil";
import { userBillHistoryState } from "./states/bills";
import StardustDateParser from "../../../../../libs/date_parser";

export default function usePaymentHistory() {
    const [userHistory, setUserHistory] = useRecoilState<Payment.ManagementFee[]>(userBillHistoryState);
    const [buildingHistory, setBuildingHistory] = useRecoilState<Payment.ManagementFee[]>(userBillHistoryState);

    const service = new PaymentServiceProvider();

    class PaymentHistory {
        public readonly user: Payment.ManagementFee[] = userHistory;
        public readonly building: Payment.ManagementFee[] = buildingHistory;

        get thisMonthBillOfUser(): Payment.ManagementFee | undefined {
            const today = StardustDateParser.changeGMT(new Date(), "kr");
            const year = today.getFullYear();
            const month = today.getMonth() + 1;

            return this.user.find((data) => data.year === year && data.month === month);
        }

        public async updateHistory(): Promise<void> {
            setUserHistory(await service.getUserBills({}));
        }
    }

    return new PaymentHistory();
}
