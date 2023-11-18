import { SafeAreaView, View } from "react-native";
import useScreenMessage from "../../../common/hooks/multilingual/hooks";
import ScreenTitleView from "../../../common/blocks/title_view";
import UserTypeSelectionButton from "../../blocks/icon_user_type";
import useWelcomeScreenStyles from "./styles";
import WelcomScreenProps from "./types";
import useSystemInfo from "../../../common/hooks/systeminfo/hooks";
import { VILLIFE_AUTHORITY } from "../../../../libs/rest_apis/villife/absc";
import useAuthService from "../../services/authentication";
import { IAuthServiceProvider } from "../../services/authentication/types";

export default function WelcomeScreen({ route }: WelcomScreenProps) {
    const styles = useWelcomeScreenStyles();
    const message = useScreenMessage();
    const sysinfo = useSystemInfo();
    const auth: IAuthServiceProvider = useAuthService();

    const handlePressNextBtn = () => {
        auth.refreshUserInfo();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userIconBox}>
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
            <View style={styles.greetingBox}>
                <ScreenTitleView
                    titles={[message.messages.auth.welcome.title]}
                    subtitles={[message.messages.auth.welcome.subtitle_1, message.messages.auth.welcome.subtitle_2]}
                    bottomButton={{
                        title: message.messages.auth.welcome.next_btn_title,
                        onPress: () => handlePressNextBtn(),
                    }}
                    disablePaddingTop
                    children={<View />}
                />
            </View>
        </SafeAreaView>
    );
}
