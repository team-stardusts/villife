import { View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import useNotificationBoxScreenStyles from "./styles";
import NotificationBoxScreenProps from "./types";
import { useEffect } from "react";
import useNotificationBoxViewModel from "./viewmodel";

export function NotificationBoxScreen({ navigation, route }: NotificationBoxScreenProps) {
    const styles = useNotificationBoxScreenStyles();
    const viewModel = useNotificationBoxViewModel();

    useEffect(() => {
        viewModel.update();
    }, []);

    useEffect(() => {
        console.log(viewModel.data);
    }, [viewModel.data]);

    return (
        <NavigationView
            headerOptions={{
                title: "알림",
                style: {
                    backgroundColor: styles.nav.backgroundColor,
                },
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}>
            <View style={styles.container}></View>
        </NavigationView>
    );
}
