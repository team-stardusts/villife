import { Alert, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import useScreenMessage from "../../../common/hooks/multilingual/hooks";
import LoginScreenProps from "./types";
import useLoginScreenStyles from "./styles";
import UniversalTextInput from "../../../common/blocks/universial/textinput";
import UniversialButton from "../../../common/blocks/universial/button";
import { useState } from "react";
import SocialLoginIcon from "../../../common/blocks/icon/login";
import ScreenTitleView from "../../../common/blocks/title_view";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { HostType } from "../../../../libs/storage/tables/login/types";
import useStyler from "../../../common/hooks/styler/hooks";
import useAuthService from "../../services/authentication";
import { LoginServiceParams } from "../../services/authentication/types";
import VillifeToastMessage from "../../../common/atoms/toast";

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
        const { loginData, socialAccessToken } = await login(host, params);

        if (loginData !== null) {
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
                    access_token: socialAccessToken,
                });
            }
        }
    };

    const showToast = () => {
        VillifeToastMessage.showBottomToast("info", messages.messages.boilerplate.preparing_service);
    };

    return (
        <SafeAreaView style={styles.main.container}>
            <ScreenTitleView
                titles={[
                    messages.messages.auth.login.request_login.line_1,
                    messages.messages.auth.login.request_login.line_2,
                ]}>
                <View style={styles.input.container}>
                    <View style={styles.input.contents}>
                        <View style={styles.input.inputBox}>
                            <Text style={styles.input.inputIdentifier}>
                                {messages.messages.auth.login.title_of_id_input}
                            </Text>
                            <View style={styles.input.input}>
                                <UniversalTextInput
                                    name="id"
                                    onChangeText={(text, name) => {
                                        if (name === "id") setAccount({ ...account, [name]: text });
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.input.inputBox}>
                            <Text style={styles.input.inputIdentifier}>
                                {messages.messages.auth.login.title_of_password_input}
                            </Text>
                            <View style={styles.input.input}>
                                <UniversalTextInput
                                    name="password"
                                    onChangeText={(text, name) => {
                                        if (name === "password") setAccount({ ...account, [name]: text });
                                    }}
                                    secureTextEntry
                                />
                            </View>
                        </View>
                        <View style={styles.input.btnWrapper}>
                            <UniversialButton
                                title={messages.messages.auth.login.title_of_login_btn}
                                titleStyle={styles.input.btnTitle}
                                onPress={() => handleLogin("villife", account)}
                                disabled={false}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.input.socialLoginBtn}
                            activeOpacity={0.8}
                            onPress={() => handleLogin("naver", account)}
                            //onPressIn={() => setIsSocialLoginButtonPressed(true)}
                            //onPressOut={() => setIsSocialLoginButtonPressed(false)}
                        >
                            <View style={styles.input.socialLoginBtnIconWrapper}>
                                <SocialLoginIcon providerName="naver" diameter={iconDiameter} />
                            </View>
                            <Text style={styles.input.btnTitle}>
                                {messages.messages.auth.login.title_of_naver_social_login_btn}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.joinLink.container}>
                    <View style={styles.joinLink.textWrapper}>
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
            </ScreenTitleView>
        </SafeAreaView>
    );
}
