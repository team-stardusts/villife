import { Alert, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import useScreenMessage from "../../../common/hooks/multilingual/hooks";
import LoginScreenProps from "./types";
import useLoginScreenStyles from "./styles";
import UniversalTextInput from "../../../common/blocks/universial/textinput";
import UniversialButton from "../../../common/blocks/universial/button";
import { useState } from "react";
import SocialLoginIcon from "../../../common/blocks/icon/login";
import AuthScreenTitleView from "../../blocks/title_view";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { HostType } from "../../../../libs/storage/tables/login/types";
import useStyler from "../../../common/hooks/styler/hooks";
import useAuthService from "../../services/authentication";
import { LoginServiceParams } from "../../services/authentication/types";

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const { deviceUI } = useStyler();
    const login = useAuthService().login;
    const messages = useScreenMessage();
    const styles = useLoginScreenStyles();
    const iconDiameter: number = deviceUI.moderateScale(40);

    const [account, setAccount] = useState<LoginServiceParams>({
        id: "",
        password: "",
    });

    const handleLogin = async (host: HostType, params: LoginServiceParams | undefined) => {
        const result = await login(host, params);

        if (result.isSuccessful && result.data) {
            return;
        } else {
            if (host === "villife") {
                Alert.alert(
                    messages.messages.auth.login.invalid_login_data.id,
                    messages.messages.auth.login.invalid_login_data.password
                );
            } else {
                // [TO-DO] 예기치 않은 이유로 로그인 실패 시 navigation X
                navigation.navigate("create_account", {
                    host: host,
                    access_token: result.socialAccessToken,
                });
            }
        }
    };

    const showToast = () => {
        Toast.show({
            type: "success",
            text1: messages.messages.boilerplate.preparing_service,
            position: "bottom",
            visibilityTime: 1500,
            bottomOffset: deviceUI.moderateScale(40),
        });
    };

    return (
        <SafeAreaView style={styles.Screen.topLevelBox}>
            <View style={styles.Screen.contentsBox}>
                <AuthScreenTitleView
                    title={`${messages.messages.auth.login.request_login.line_1}\n${messages.messages.auth.login.request_login.line_2}`}
                />
                <View style={styles.LoginInputSection.topLevelBox}>
                    <View style={styles.LoginInputSection.attrWrapper}>
                        <View style={styles.LoginInputSection.inputWrapper}>
                            <Text style={styles.LoginInputSection.inputIdentifier}>
                                {messages.messages.auth.login.title_of_id_input}
                            </Text>
                            <UniversalTextInput
                                name="id"
                                onChangeText={(text, name) => {
                                    if (name === "id") setAccount({ ...account, [name]: text });
                                }}
                            />
                        </View>
                        <View style={styles.LoginInputSection.inputWrapper}>
                            <Text style={styles.LoginInputSection.inputIdentifier}>
                                {messages.messages.auth.login.title_of_password_input}
                            </Text>
                            <UniversalTextInput
                                name="password"
                                onChangeText={(text, name) => {
                                    if (name === "password") setAccount({ ...account, [name]: text });
                                }}
                                secureTextEntry
                            />
                        </View>
                        <View style={styles.LoginInputSection.btnWrapper}>
                            <UniversialButton
                                title={messages.messages.auth.login.title_of_login_btn}
                                titleStyle={styles.LoginInputSection.btnTitle}
                                onPress={() => handleLogin("villife", account)}
                                disabled={false}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.LoginInputSection.socialLoginBtn}
                            activeOpacity={0.8}
                            onPress={() => handleLogin("naver", account)}
                            //onPressIn={() => setIsSocialLoginButtonPressed(true)}
                            //onPressOut={() => setIsSocialLoginButtonPressed(false)}
                        >
                            <View style={styles.LoginInputSection.socialLoginBtnIconWrapper}>
                                <SocialLoginIcon providerName="naver" diameter={iconDiameter} />
                            </View>
                            <Text style={styles.LoginInputSection.btnTitle}>
                                {messages.messages.auth.login.title_of_naver_social_login_btn}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.JoinLinkSection.topLevelBox}>
                    <View style={styles.JoinLinkSection.textWrapper}>
                        <TouchableOpacity
                            activeOpacity={0.4}
                            onPress={() => {
                                navigation.navigate("create_account", {
                                    host: "villife",
                                    access_token: undefined,
                                });
                            }}>
                            <Text style={styles.JoinLinkSection.text}>{messages.messages.auth.login.join}</Text>
                        </TouchableOpacity>
                        <Text style={[{ marginHorizontal: deviceUI.moderateScale(8) }, styles.JoinLinkSection.text]}>
                            |
                        </Text>
                        <TouchableOpacity activeOpacity={0.4} onPress={showToast}>
                            <Text style={styles.JoinLinkSection.text}>
                                {messages.messages.auth.login.reset_password}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/*
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
                */}
            </View>
        </SafeAreaView>
    );
}
