import NavigationView from "../common/blocks/navigation";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useStyler from "../common/hooks/styler/hooks";
import { AppleButton, appleAuth } from "@invertase/react-native-apple-authentication";
import useNavigationViewSpace from "../common/blocks/navigation/service";
import useAuthService from "../auth/services/authentication";

export default function TestScreen() {
    const auth = useAuthService();
    const { deviceUI, theme } = useStyler();
    const space = useNavigationViewSpace({
        applyDefaultVerticalPadding: false,
        applyDefaultHorizontalPadding: true,
        isBottomNavShown: false,
        isHeaderShown: true,
    });
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        btn: {
            borderRadius: deviceUI.moderateScale(10),
            backgroundColor: theme.color.specified.blue,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: deviceUI.moderateScale(10),
            marginVertical: deviceUI.moderateScale(10),
        },
        btnText: {
            fontSize: deviceUI.moderateScale(12),
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            color: theme.color.specified.white,
        },
        appleBtnWrapper: {
            width: "100%",
        },
        appleBtn: {
            width: space.width,
            height: space.height * 0.08,
        },
    });

    const link = (what: "tel" | "sms" | "mailto", to: string): void => {
        Linking.openURL(`${what}:${to}`);
    };

    const onAppleButtonPress = async () => {
        console.log("Start to login with apple.");
        // performs login request
        const appleAuthRequestResponse = await appleAuth
            .performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                // Note: it appears putting FULL_NAME first is important, see issue #293
                requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
            })
            .then((r) => {
                return r;
            })
            .catch((r) => {
                return null;
            });

        if (appleAuthRequestResponse === null) return;

        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
            console.log(appleAuthRequestResponse);
        }
    };

    return (
        <NavigationView
            headerOptions={{ title: "테스트" }}
            bottomNavOptions={{ shown: false }}
            bodyOptions={{
                applyDefaultHorizontalPadding: true,
            }}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        link("tel", "010-0000-0000");
                    }}>
                    <Text style={styles.btnText}>전화</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        link("sms", "010-0000-0000");
                    }}>
                    <Text style={styles.btnText}>문자</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        link("mailto", "backingbin@gmail.com");
                    }}>
                    <Text style={styles.btnText}>이메일</Text>
                </TouchableOpacity>
                <View style={styles.appleBtnWrapper}>
                    <AppleButton
                        buttonStyle={AppleButton.Style.BLACK}
                        buttonType={AppleButton.Type.SIGN_IN}
                        style={styles.appleBtn}
                        onPress={() => auth.login("apple", undefined)}
                    />
                </View>
            </View>
        </NavigationView>
    );
}

/*
Linking.openURL("tel:010-0000-0000") // 전화 걸기
Linking.openURL("sms:010-0000-0000") // 문자 보내기
Linking.openURL("mailto:backingbin@gmail.com") // 이메일 보내기
*/

const link = (what: "tel" | "sms" | "mailto", to: string): void => {
    Linking.openURL(`${what}:${to}`);
};
