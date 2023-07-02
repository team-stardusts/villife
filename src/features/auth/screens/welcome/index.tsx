import { SafeAreaView, View } from "react-native";
import useScreenMessage from "../../../common/hooks/multilingual/hooks";
import AuthScreenBottonButton from "../../blocks/bottom_button";
import AuthScreenTitleView from "../../blocks/title_view";
import UserTypeSelectionButton from "../../blocks/icon_user_type";
import useWelcomeScreenStyles from "./styles";
import WelcomScreenProps from "./types";
import useSystemInfo from "../../../common/hooks/systeminfo/hooks";
import { VILLIFE_AUTHORITY } from "../../../../libs/rest_apis/villife/absc";

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
                            caption={
                                route.params.authority === VILLIFE_AUTHORITY.ADMIN
                                    ? message.messages.words.admin
                                    : message.messages.words.renter
                            }
                            userType={route.params.authority}
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
