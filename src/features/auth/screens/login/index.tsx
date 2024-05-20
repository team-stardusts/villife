import { Alert, Platform, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import useScreenMessage from "../../../common/hooks/multilingual/hooks";
import LoginScreenProps from "./types";
import useLoginScreenStyles from "./styles";
import UniversalTextInput from "../../../common/blocks/universial/textinput";
import { useEffect, useState } from "react";
import ScreenTitleView from "../../../common/blocks/title_view";
import { HostType } from "../../../../libs/storage/tables/login/types";
import useAuthService, { LoginFailedReason } from "../../services/authentication";
import { LoginServiceParams } from "../../services/authentication/types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoginButton from "./blocks/button";

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const auth = useAuthService();
    const messages = useScreenMessage();
    const styles = useLoginScreenStyles();
    const [hosts, setHosts] = useState<HostType[]>(["villife", "naver"]);
    const [account, setAccount] = useState<LoginServiceParams>({
        id: "",
        password: "",
    });

    useEffect(() => {
        if (Platform.OS === "ios" && !hosts.find((v) => v === "apple")) {
            setHosts([...hosts, "apple"]);
        }
    }, []);

    const loginTo = async (host: HostType, params?: LoginServiceParams | undefined) => {
        const { loginData, socialAccessToken, failedReason } = await auth.login(host, params);

        switch (host) {
            case "apple":
                if (loginData === null) {
                    navigation.navigate("terms_of_service", {
                        host: host,
                    });
                }
                break;
            case "naver":
                if (loginData === null) {
                    navigation.navigate("terms_of_service", {
                        host: host,
                        access_token: socialAccessToken,
                    });
                }
                break;
            default: // "villife"
                if (failedReason !== undefined) {
                    let title = "오류가 발생하여 로그인을 하지 못했습니다.";
                    let message: string | undefined = "지속적으로 발생할 경우 빌라이프 팀에 문의 바랍니다.";

                    switch (failedReason) {
                        case LoginFailedReason.IdNotFound:
                            title = "등록되지 않은 계정입니다.";
                            message = undefined;
                            break;
                        case LoginFailedReason.WrongPassword:
                            title = "잘못된 비밀번호 입니다.";
                            message = undefined;
                            break;
                    }

                    Alert.alert(title, message);
                }
        }
    };

    /* const showToast = () => {
        VillifeToastMessage.showBottomToast("info", messages.messages.boilerplate.preparing_service);
    }; */

    return (
        <SafeAreaView style={styles.main.container}>
            <ScreenTitleView
                titles={[
                    messages.messages.auth.login.request_login.line_1,
                    messages.messages.auth.login.request_login.line_2,
                ]}>
                <KeyboardAwareScrollView style={styles.main.wrapper}>
                    <View style={styles.main.inputBox}>
                        <Text style={styles.main.inputTitle}>{messages.messages.auth.login.title_of_id_input}</Text>
                        <View style={styles.main.inputWrapper}>
                            <UniversalTextInput
                                name="id"
                                onChangeText={(text, name) => {
                                    if (name === "id") setAccount({ ...account, [name]: text });
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.main.inputBox}>
                        <Text style={styles.main.inputTitle}>
                            {messages.messages.auth.login.title_of_password_input}
                        </Text>
                        <View style={styles.main.inputWrapper}>
                            <UniversalTextInput
                                name="password"
                                onChangeText={(text, name) => {
                                    if (name === "password") setAccount({ ...account, [name]: text });
                                }}
                                secureTextEntry
                            />
                        </View>
                    </View>
                    {hosts.map((host, index) => {
                        if (Platform.OS === "ios" && host !== "villife") {
                            return;
                        }

                        let title;
                        switch (host) {
                            case "apple":
                                title = "Apple 로그인";
                                break;
                            case "naver":
                                title = "Naver 로그인";
                                break;
                            default:
                                title = "로그인";
                        }
                        return (
                            <View key={index} style={styles.main.btnWrapper}>
                                <LoginButton
                                    provider={host}
                                    title={title}
                                    onPress={(host) => loginTo(host, host === "villife" ? account : undefined)}
                                />
                            </View>
                        );
                    })}
                    <View style={styles.link.container}>
                        <View style={styles.link.wrapper}>
                            <TouchableOpacity
                                activeOpacity={0.4}
                                onPress={() => {
                                    navigation.navigate("terms_of_service", {
                                        host: "villife",
                                        access_token: undefined,
                                    });
                                }}>
                                <Text style={styles.link.text}>{messages.messages.auth.login.join}</Text>
                            </TouchableOpacity>
                            <View style={styles.link.spacer}>
                                <Text style={styles.link.text}>|</Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.4}
                                onPress={() => {
                                    navigation.navigate("general_webview", {
                                        title: "아이디 찾기",
                                        url: "http://myvillife.com/auth/finding-account?target=id&isMobile=true",
                                    });
                                }}>
                                <Text style={styles.link.text}>아이디 찾기</Text>
                            </TouchableOpacity>
                            <View style={styles.link.spacer}>
                                <Text style={styles.link.text}>|</Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.4}
                                onPress={() => {
                                    navigation.navigate("general_webview", {
                                        title: "비밀번호 재설정",
                                        url: "http://myvillife.com/auth/finding-account?target=password&isMobile=true",
                                    });
                                }}>
                                <Text style={styles.link.text}>비밀번호 재설정</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </ScreenTitleView>
        </SafeAreaView>
    );
}

{
    /* <View style={styles.joinLink.textWrapper}>
                        <TouchableOpacity
                            activeOpacity={0.4}
                            onPress={() => {
                                navigation.navigate("create_account", {
                                    host: "villife",
                                    access_token: undefined,
                                });
                            }}>
                            <Text style={styles.joinLink.text}>{messages.messages.auth.login.join}</Text>
                        </TouchableOpacity>
                        <Text style={[{ marginHorizontal: deviceUI.moderateScale(8) }, styles.joinLink.text]}>|</Text>
                        <TouchableOpacity activeOpacity={0.4} onPress={showToast}>
                            <Text style={styles.joinLink.text}>{messages.messages.auth.login.reset_password}</Text>
                        </TouchableOpacity>
                    </View> */
}
{
    /*
                    <View style={styles.SocialLoginSection.topLevelBox}>
                        <View style={styles.SocialLoginSection.iconsWrapper}>
                            <SocialLoginIcon 
                                providerName="naver"
                                diameter={iconDiameter}
                                onPress={() => LoginManager.naver.login()}
                                />
                            <SocialLoginIcon
                                providerName="kakao"
                                diameter={iconDiameter}
                                onPress={() => handleSetLoginData(LoginManager.kakao.login())}
                                />
                            <SocialLoginIcon 
                                providerName="google"
                                diameter={iconDiameter}
                                onPress={() => LoginManager.kakao.getKakaoProfile()}
                                />
                        </View>
                    </View>
                */
}
