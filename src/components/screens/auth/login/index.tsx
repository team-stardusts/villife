import { Alert, Pressable, SafeAreaView, Text, View } from "react-native";
import useScreenMessage from "../../../../hooks/multilingual/hooks";
import LoginScreenProps from "./types";
import useLoginScreenStyles from "./styles";
import UniversalTextInput from "../../../blocks/universial/textinput";
import UniversialButton from "../../../blocks/universial/button";
import { useRecoilState } from "recoil";
import { useState } from "react";
import useSystemInfo from "../../../../hooks/systeminfo/hooks";
import SocialLoginIcon from "../../../blocks/icon/login";
import useAppTheme from "../../../../hooks/themes/hooks";
import { useLoginService } from "../../../../hooks/services/hooks";
import AuthScreenTitleView from "../../../blocks/auth_screens/title_view";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { HostType } from "../../../../libs/storage/tables/login/types";
import useAuthService from "../../../../hooks/services/login/hooks";
import { LoginServiceParams } from "../../../../hooks/services/login/types";
//import AppRoutes from '../../../../data/routes.json';

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const loginm = useLoginService();
    const login = useAuthService().login;
    const messages = useScreenMessage();
    const theme = useAppTheme();
    const systemInfo = useSystemInfo();
    const styles = useLoginScreenStyles();
    const iconDiameter: number = useSystemInfo().window.width * 0.12;

    const [isSocialLoginButtonPressed, setIsSocialLoginButtonPressed] = useState<boolean>(false);

    const [account, setAccount] = useState<LoginServiceParams>({
        id: "",
        password: "",
    });

    const handleLogin = async (host: HostType, params: LoginServiceParams | undefined) => {
        const result = await login(host, params);

        if (result.isSuccessful && result.data) {
            navigation.reset({
                index: 0,
                routes: [{ name: "home", params: {} }],
            });
        } else {
            if (host === "villife") {
                Alert.alert("잘못 된 계정 정보가 입력 되었습니다.", "옳바른 아이디와 패스워드를 입력해주세요.");
            } else {
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
            text1: "서비스 준비중입니다.",
            position: "bottom",
            visibilityTime: 1500,
            bottomOffset: systemInfo.window.height * 0.12,
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
                        <Pressable
                            style={styles.LoginInputSection.socialLoginBtn}
                            onPress={() => handleLogin("naver", account)}
                            onPressIn={() => setIsSocialLoginButtonPressed(true)}
                            onPressOut={() => setIsSocialLoginButtonPressed(false)}>
                            <View style={styles.LoginInputSection.socialLoginBtnIconWrapper}>
                                <SocialLoginIcon providerName="naver" diameter={iconDiameter} />
                            </View>
                            <Text style={styles.LoginInputSection.socialLoginBtnTitle}>
                                {messages.messages.auth.login.title_of_naver_social_login_btn}
                            </Text>
                            <View
                                style={isSocialLoginButtonPressed ? styles.LoginInputSection.socialLoginPressedIn : {}}
                            />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.JoinLinkSection.topLevelBox}>
                    <View style={styles.JoinLinkSection.textWrapper}>
                        <Pressable
                            children={({ pressed }: any) => (
                                <Text
                                    style={[
                                        {
                                            color: pressed
                                                ? theme.colors.colorFamily.blue
                                                : theme.colors.colorFamily.black,
                                            fontSize: pressed
                                                ? systemInfo.window.width * 0.036
                                                : systemInfo.window.width * 0.035,
                                        },
                                        styles.JoinLinkSection.text,
                                    ]}
                                    onPress={() => {
                                        navigation.navigate("create_account", {
                                            host: "villife",
                                            access_token: undefined,
                                        });
                                    }}>
                                    {messages.messages.auth.login.join}
                                </Text>
                            )}
                        />
                        <Text style={[{ fontSize: systemInfo.window.width * 0.035 }, styles.JoinLinkSection.text]}>
                            |
                        </Text>
                        <Pressable
                            children={({ pressed }: any) => (
                                <Text
                                    style={[
                                        {
                                            color: pressed
                                                ? theme.colors.colorFamily.blue
                                                : theme.colors.colorFamily.black,
                                            fontSize: pressed
                                                ? systemInfo.window.width * 0.036
                                                : systemInfo.window.width * 0.035,
                                        },
                                        styles.JoinLinkSection.text,
                                    ]}
                                    onPress={showToast}>
                                    {messages.messages.auth.login.reset_password}
                                </Text>
                            )}
                        />
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
