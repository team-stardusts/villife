import { View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import useTenantSettingScreenStyles from "./styles";
import TenantSettingScreenProps from "./types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";

export default function TenantSettingScreen({ navigation, route }: TenantSettingScreenProps) {
    const styles = useTenantSettingScreenStyles();
    const messages = useScreenMessage();

    return (
        <NavigationView
            headerOptions={{
                title: "세입자 정보",
                backgroundColor: styles.nav.backgroundColor,
            }}
            bodyOptions={{
                backgroundColor: styles.nav.backgroundColor,
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}>
            <View style={styles.container}></View>
        </NavigationView>
    );
}
