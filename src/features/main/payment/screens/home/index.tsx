import { ScrollView, View } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import PaymentScreenProps from "./types";
import usePaymentScreenStyles from "./styles";
import usePayer from "../../services";
import PaymentBox from "./blocks/payment_box";
import BillBox from "./blocks/bill_box";
import PaymentStatusScrollView from "./blocks/pament_status_scrollview";

export default function PaymentScreen({ navigation, route }: PaymentScreenProps) {
    const messages = useScreenMessage();
    const styles = usePaymentScreenStyles();
    const payer = usePayer();

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.payment.screen_title,
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: true,
            }}>
            <ScrollView style={styles.main.container}>
                <PaymentBox styles={styles.payment} manangementFee={payer?.thisMonthFee} />
                <BillBox styles={styles.bill} manangementFee={payer?.thisMonthFee} />
                <PaymentStatusScrollView styles={styles.paymentStatus} manangementFees={payer?.fees} />
            </ScrollView>
        </NavigationView>
    );
}
