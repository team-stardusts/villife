import { ScrollView, View } from "react-native";
import ManagementFeeBox from "./blocks/fee_box";
import BillBox from "./blocks/bill_box";
import ManagementFeeStatusScrollView from "./blocks/status_scrollview";
import useUserMFViewStyles from "./styles";
import usePayer from "../../../../services/payer";

export default function UserMFView() {
    const styles = useUserMFViewStyles();
    const payer = usePayer();

    return (
        <ScrollView style={styles.main.container}>
            <View style={styles.main.wrapper}>
                <ManagementFeeBox styles={styles.managementFee} manangementFee={payer.history.thisMonthBillOfUser} />
                <BillBox
                    styles={styles.bill}
                    manangementFee={payer.history.thisMonthBillOfUser}
                    unpaidFee={payer.history.userUnpaidFee}
                />
            </View>
            <ManagementFeeStatusScrollView styles={styles.managementFeeStatus} manangementFee={payer.history.user} />
        </ScrollView>
    );
}
