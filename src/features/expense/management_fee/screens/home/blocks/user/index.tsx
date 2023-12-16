import { ScrollView, View } from "react-native";
import ManagementFeeBox from "./blocks/fee_box";
import BillBox from "./blocks/bill_box";
import ManagementFeeStatusScrollView from "./blocks/status_scrollview";
import useUserMFViewStyles from "./styles";
import useManagementFeeManager from "../../../../services/payment";
import { useEffect, useState } from "react";
import { PaymentBill, UserPaymentManagerBase } from "../../../../services/payment/types";
import PaymentHistoryBox from "./blocks/history_box";
import InfoPannel from "../../../../../../common/blocks/info-pannel";

export default function UserMFView() {
    const styles = useUserMFViewStyles();
    const manager: UserPaymentManagerBase = useManagementFeeManager() as UserPaymentManagerBase;
    const [bill, setBill] = useState<PaymentBill | null>(null);

    useEffect(() => {
        manager.updateHistory();
    }, []);

    useEffect(() => {
        setBill(manager.calcByPaymentItem(manager.history));
    }, [manager.history]);

    return (
        <>
            <View style={styles.main.wrapper}>
                <InfoPannel
                    infos={[
                        { type: "info", message: "타행에서 입급한 경우 반드시 '입금확인요청'을 하셔야 합니다." },
                        { type: "info", message: "'입금확인요청'을 하지 않으면 연체료가 발생할 수 있습니다." },
                    ]}
                />
            </View>
            <ScrollView style={styles.main.container}>
                <View style={styles.main.wrapper}>
                    <ManagementFeeBox styles={styles.managementFee} feeToPay={bill?.feeToPay} />
                    {bill !== null && <BillBox styles={styles.bill} {...bill} />}
                </View>
                {manager.history.length > 0 && (
                    <ManagementFeeStatusScrollView
                        styles={styles.managementFeeStatus}
                        manangementFees={manager.history}
                    />
                )}
                <View style={styles.main.wrapper}>
                    <PaymentHistoryBox styles={styles.history} />
                </View>
            </ScrollView>
        </>
    );
}
