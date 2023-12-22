import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ManagementFeeHomeScreenProps from "./types";
import useUserInformation from "../../../../common/hooks/service/user_info";
import UserMFView from "./blocks/user";
import AdminMFView from "./blocks/admin";

export default function ManagementFeeHomeScreen({ navigation, route }: ManagementFeeHomeScreenProps) {
    const messages = useScreenMessage();
    const user = useUserInformation();

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
