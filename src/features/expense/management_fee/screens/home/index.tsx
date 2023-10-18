import { ScrollView, View } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ManagementFeeHomeScreenProps from "./types";
import useManagementFeeHomeScreenStyles from "./styles";
import usePayer from "../../services/payer";
import BillBox from "./blocks/user/blocks/bill_box";
import { useEffect } from "react";
import useUserInformation from "../../../../common/hooks/service/user_info";
import ManagementFeeBox from "./blocks/user/blocks/fee_box";
import ManagementFeeStatusScrollView from "./blocks/user/blocks/status_scrollview";
import UserMFView from "./blocks/user";
import AdminMFView from "./blocks/admin";
import { AdminPaymentManagerBase, History } from "../../services/payment/types";
import { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";
import useManagementFeeManager from "../../services/payment";

export default function ManagementFeeHomeScreen({ navigation, route }: ManagementFeeHomeScreenProps) {
    const messages = useScreenMessage();
    const styles = useManagementFeeHomeScreenStyles();
    const user = useUserInformation();
    const payer = usePayer();
    const manager: History<any> = useManagementFeeManager();

    useEffect(() => {
        payer.history.updateHistory();
        manager.updateHistory();
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
            {user?.isAdmin ? <AdminMFView /> : <UserMFView />}
        </NavigationView>
    );
}
