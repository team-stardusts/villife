import { ScrollView, View } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import PaymentScreenProps from "./types";
import usePaymentScreenStyles from "./styles";
import usePayer from "../../services/payer";
import PaymentBox from "./blocks/payment_box";
import BillBox from "./blocks/bill_box";
import PaymentStatusScrollView from "./blocks/pament_status_scrollview";
import { useEffect } from "react";
import useUserInformation from "../../../../common/hooks/service/user_info";

export default function PaymentScreen({ navigation, route }: PaymentScreenProps) {
    const messages = useScreenMessage();
    const styles = usePaymentScreenStyles();
    const user = useUserInformation();
    const payer = usePayer();

    useEffect(() => {
        payer.history.updateHistory();
    }, [user?.adminInfomation?.selectedBuilding]);

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.payment.screen_title,
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}>
            <ScrollView style={styles.main.container}>
                <View style={styles.main.wrapper}>
                    <PaymentBox styles={styles.payment} manangementFee={payer.history.thisMonthBillOfUser} />
                    <BillBox styles={styles.bill} manangementFee={payer.history.thisMonthBillOfUser} />
                </View>
                <PaymentStatusScrollView styles={styles.paymentStatus} manangementFees={payer.history.user} />
            </ScrollView>
        </NavigationView>
    );
}
