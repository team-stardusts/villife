import { ScrollView, View } from "react-native";
import ManagementFeeBox from "./blocks/fee_box";
import BillBox from "./blocks/bill_box";
import ManagementFeeStatusScrollView from "./blocks/status_scrollview";
import useUserMFViewStyles from "./styles";
import useManagementFeeManager from "../../../../services/payment";
import { useEffect, useState } from "react";
import { PaymentBill, UserPaymentManagerBase } from "../../../../services/payment/types";
import PaymentHistoryBox from "./blocks/history_box";

export default function UserMFView() {
    const styles = useUserMFViewStyles();
    const manager: UserPaymentManagerBase = useManagementFeeManager() as UserPaymentManagerBase;
    const [unpaidMF, setUnpaidMF] = useState<number>(0);
    const [bill, setBill] = useState<PaymentBill | null>(null);

    useEffect(() => {
        manager.updateHistory();
    }, []);

    useEffect(() => {
        setBill(manager.calcByPaymentItem(manager.history));
        if (manager.history.length > 0) {
            let _unpaidMF = 0;

            manager.history.forEach((element) => {
                // [TO-DO] is_paid == undefined는 임시로 필요한 조건이며
                // API 업데이트 시 불필요함
                if (!element.is_paid) {
                    _unpaidMF += element.amount_won;
                    _unpaidMF += element.overdue_interest;
                }
            });

            setUnpaidMF(_unpaidMF);
        }
    }, [manager.history]);

    return (
        <ScrollView style={styles.main.container}>
            <View style={styles.main.wrapper}>
                <ManagementFeeBox styles={styles.managementFee} feeToPay={bill?.feeToPay} />
                {bill !== null && <BillBox styles={styles.bill} {...bill} />}
            </View>
            {manager.history.length > 0 && (
                <ManagementFeeStatusScrollView
                    styles={styles.managementFeeStatus}
                    manangementFees={manager.history}
                    feeToPay={unpaidMF}
                />
            )}
            <View style={styles.main.wrapper}>
                <PaymentHistoryBox styles={styles.history} />
            </View>
        </ScrollView>
    );
}
