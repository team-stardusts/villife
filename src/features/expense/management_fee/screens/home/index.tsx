import { ScrollView, View } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ManagementFeeHomeScreenProps from "./types";
import useManagementFeeHomeScreenStyles from "./styles";
import usePayer from "../../services/payer";
import ManagementFeeBox from "./blocks/fee_box";
import BillBox from "./blocks/bill_box";
import ManagementFeeStatusScrollView from "./blocks/status_scrollview";
import { useEffect } from "react";
import useUserInformation from "../../../../common/hooks/service/user_info";

export default function ManagementFeeHomeScreen({ navigation, route }: ManagementFeeHomeScreenProps) {
    const messages = useScreenMessage();
    const styles = useManagementFeeHomeScreenStyles();
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
                    <ManagementFeeBox
                        styles={styles.managementFee}
                        manangementFee={payer.history.thisMonthBillOfUser}
                    />
                    <BillBox
                        styles={styles.bill}
                        manangementFee={payer.history.thisMonthBillOfUser}
                        unpaidFee={payer.history.userUnpaidFee}
                    />
                </View>
                <ManagementFeeStatusScrollView
                    styles={styles.managementFeeStatus}
                    manangementFee={payer.history.user}
                />
            </ScrollView>
        </NavigationView>
    );
}
