import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ManagementFeeHomeScreenProps from "./types";
import useManagementFeeHomeScreenStyles from "./styles";
import usePayer from "../../services/payer";
import { useEffect } from "react";
import useUserInformation from "../../../../common/hooks/service/user_info";
import UserMFView from "./blocks/user";
import AdminMFView from "./blocks/admin";
import { History } from "../../services/payment/types";
import useManagementFeeManager from "../../services/payment";

export default function ManagementFeeHomeScreen({ navigation, route }: ManagementFeeHomeScreenProps) {
    const messages = useScreenMessage();
    const styles = useManagementFeeHomeScreenStyles();
    const user = useUserInformation();
    const manager: History<any> = useManagementFeeManager();

    useEffect(() => {
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
