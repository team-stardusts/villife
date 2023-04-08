import { SafeAreaView, View } from "react-native";
import useScreenMessage from "../../../../hooks/multilingual/hooks";
import AuthScreenBottonButton from "../../../blocks/auth_screens/bottom_button";
import AuthScreenTitleView from "../../../blocks/auth_screens/title_view";
import UserTypeSelectionButton from "../../../blocks/auth_screens/icon_user_type";
import useWelcomeScreenStyles from "./styles";
import WelcomScreenProps from "./types";
import useSystemInfo from "../../../../hooks/systeminfo/hooks";

export default function WelcomeScreen({ navigation, route }: WelcomScreenProps) {
    const styles = useWelcomeScreenStyles();
    const message = useScreenMessage();
    const sysinfo = useSystemInfo();

    return (
        <SafeAreaView style={styles.Screen.topLevelBox}>
            <View style={styles.Screen.screenWrapper}>
                <View style={styles.ContentsSection.toplevelBox}>
                    <View style={styles.ContentsSection.iconBox}>
                        <UserTypeSelectionButton
                            caption={message.messages.words[route.params.role]}
                            userType={route.params.role}
                            size={sysinfo.window.width * 0.25}
                            selected={true}
                        />
                    </View>
                    <View style={styles.ContentsSection.titleViewBox}>
                        <AuthScreenTitleView
                            title={message.messages.auth.welcome.title}
                            subtitles={[
                                message.messages.auth.welcome.subtitle_1,
                                message.messages.auth.welcome.subtitle_2,
                            ]}
                        />
                    </View>
                </View>
                <View style={styles.BlankSection.toplevelBox} />
            </View>
            <AuthScreenBottonButton
                title={message.messages.auth.welcome.next_btn_title}
                onPress={() =>
                    navigation.navigate("set_building", {
                        id: route.params.id,
                        password: route.params.password,
                    })
                }
            />
        </SafeAreaView>
    );
}
