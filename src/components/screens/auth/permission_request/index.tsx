import { SafeAreaView, View } from "react-native";
import useScreenMessage from "../../../../hooks/multilingual/hooks";
import AuthScreenBottonButton from "../../../blocks/auth_screens/bottom_button";
import AuthScreenTitleView from "../../../blocks/auth_screens/title_view";
import useWelcomeScreenStyles from "./styles";
import useSystemInfo from "../../../../hooks/systeminfo/hooks";
import PermissionRequestScreenProps from "./types";
import PermissionScreenView from "../../../blocks/auth_screens/permission_view";

export default function PermissionRequestScreen({ navigation, route }: PermissionRequestScreenProps) {
    const styles = useWelcomeScreenStyles();
    const Message = useScreenMessage();
    const sysinfo = useSystemInfo();

    return (
        <SafeAreaView style={styles.Screen.topLevelBox}>
            <View style={styles.Screen.screenWrapper}>
                <View style={styles.ContentsSection.topLevelBox}>
                    <View style={styles.ContentsSection.horizontalLine}></View>
                    <View style={styles.ContentsSection.barSort}>
                        <PermissionScreenView
                            title={Message.messages.auth.permission_request.phone_permission_1}
                            subtitle={Message.messages.auth.permission_request.phone_permission_2}
                        />
                    </View>
                </View>
                <View style={styles.BlankSection.topLevelBox} />
            </View>
            <AuthScreenBottonButton
                title={Message.messages.auth.welcome.next_btn_title}
                onPress={() => {
                    return console.log("tq");
                }}
            />
        </SafeAreaView>
    );
}
