import { SafeAreaView, View, Text } from "react-native";
import useScreenMessage from "../../../common/hooks/multilingual/hooks";
import AuthScreenBottonButton from "../../blocks/bottom_button";
import ScreenTitleView from "../../../common/blocks/title_view";
import useWelcomeScreenStyles from "./styles";
import useSystemInfo from "../../../common/hooks/systeminfo/hooks";
import PermissionRequestScreenProps from "./types";
import PermissionScreenView from "../../blocks/permission_view";

export default function PermissionRequestScreen({ navigation, route }: PermissionRequestScreenProps) {
    const styles = useWelcomeScreenStyles();
    const messages = useScreenMessage();
    const sysinfo: number = useSystemInfo().window.width * 0.5;

    return (
        <SafeAreaView style={styles.Screen.topLevelBox}>
            <ScreenTitleView titles={[messages.messages.auth.permission_request.title]}>
                <View style={styles.ContentsSection.topLevelBox}>
                    <View style={{ alignContent: "center", flex: 1 }}>
                        <Text>{messages.messages.auth.permission_request.subtitle_1}</Text>
                        <PermissionScreenView
                            title={messages.messages.auth.permission_request.phone_permission_1}
                            subtitle={messages.messages.auth.permission_request.phone_permission_2}
                            providerName="phoneIcon"
                            diameter={100}
                        />
                        <PermissionScreenView
                            title={messages.messages.auth.permission_request.address_book_1}
                            subtitle={messages.messages.auth.permission_request.address_book_2}
                            providerName="addressBookIcon"
                            diameter={100}
                        />
                    </View>
                    <View style={styles.ContentsSection.horizontalLine}></View>
                    <View style={{ alignContent: "center", flex: 1 }}>
                        <Text>{messages.messages.auth.permission_request.subtitle_2}</Text>
                        <PermissionScreenView
                            title={messages.messages.auth.permission_request.camera_permission_1}
                            subtitle={messages.messages.auth.permission_request.camera_permission_2}
                            providerName="cameraIcon"
                            diameter={100}
                        />
                        <PermissionScreenView
                            title={messages.messages.auth.permission_request.location_permission_1}
                            subtitle={messages.messages.auth.permission_request.location_permission_2}
                            providerName="locationIcon"
                            diameter={100}
                        />
                        <Text>{messages.messages.auth.permission_request.Additional_Information_1}</Text>
                        <Text>{messages.messages.auth.permission_request.Additional_Information_2}</Text>
                    </View>
                </View>
                <View style={styles.BlankSection.topLevelBox} />
            </ScreenTitleView>
            <View style={{ width: sysinfo }}>
                <AuthScreenBottonButton
                    title="종료"
                    onPress={() => {
                        return console.log("종료");
                    }}
                />
            </View>
            <View style={{ width: sysinfo, marginLeft: sysinfo }}>
                <AuthScreenBottonButton
                    title="확인"
                    onPress={() => {
                        return console.log("확인");
                    }}
                />
            </View>
        </SafeAreaView>
    );
}
