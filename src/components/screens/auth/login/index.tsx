import { Pressable, SafeAreaView, Text, View } from "react-native";
import useScreenMessage from "../../../../hooks/multilingual/hooks";
import LoginScreenProps, { LoginScreenStylesType } from "./types";
import useLoginScreenStyles from "./styles";
import UniversalTextInput from "../../../blocks/universial/textinput";
import UniversialButton from "../../../blocks/universial/button";
import { useRecoilState } from "recoil";
import { useState } from "react";
import useSystemInfo from "../../../../hooks/systeminfo/hooks";
import SocialLoginIcon from "../../../blocks/icon/login";
import useAppTheme from "../../../../hooks/themes/hooks";
import { useLoginService } from "../../../../hooks/services/hooks";
import { SocialLoginHostType } from "../../../../libs/rest_apis/villife/types";
import AuthScreenTitleView from "../../../blocks/auth_screens/title_view";
import { loginDataState } from "../../../../hooks/states/atoms/login";
import { LoginDataStateType } from "../../../../hooks/states/atoms/login/types";
import useVillifeStorage from "../../../../hooks/storage/hooks";
//import AppRoutes from '../../../../data/routes.json';

type UserAuth = {
    id: string | null;
    password: string | null;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const loginManager = useLoginService();
    const messages = useScreenMessage();
    const theme = useAppTheme();
    const systemInfo = useSystemInfo();
    const styles = useLoginScreenStyles();
    const storage = useVillifeStorage();
    const iconDiameter: number = useSystemInfo().window.width * 0.12;

    const [isSocialLoginButtonPressed, setIsSocialLoginButtonPressed] = useState<boolean>(false);

    const [auth, setAuth] = useState<UserAuth>({
        id: null,
        password: null,
    });

    const [_, setLoginData] = useRecoilState<LoginDataStateType>(loginDataState);

    const handleLogin = async (host: SocialLoginHostType) => {
        const { isSuccessful, data, socailAccessToken } = await loginManager[host].login(); // LoginManager.naver.login();

        if (isSuccessful && data) {
            const loginData = {
                host: host,
                accessToken: data.data.access_token,
                refreshToken: data.data.refresh_token,
                accessTokenExpiresAt: data.data.expire_at,
            };

            const setStorageResult = await storage.login.set(loginData);

            if (setStorageResult === null) {
                // [TO-DO] Storage에 저장하지 못한 예외 상황 처리
            } else {
                setLoginData(loginData);
            }

            navigation.reset({
                index: 0,
                routes: [{ name: "home", params: {} }],
            });
        } else if (!isSuccessful) {
            // Modal & Navigate to join screen.
            navigation.navigate("create_account", {
                host: host,
                access_token: socailAccessToken,
            });
        }
    };

    return (
        <SafeAreaView style={styles.Screen.topLevelBox}>
            <View style={styles.Screen.contentsBox}>
                {/*
            <View style={styles.GreetingSection.topLevelBox}>
                <View style={styles.GreetingSection.textWrapper}>
                    <Text style={styles.GreetingSection.text}>
                        {Messages.messages.auth.login.request_login.line_1}
                    </Text>
                    <Text style={styles.GreetingSection.text}>
                        {Messages.messages.auth.login.request_login.line_2}
                    </Text>
                </View>
            </View>
            */}
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
                                    if (name === "id") setAuth({ ...auth, [name]: text });
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
                                    if (name === "password") setAuth({ ...auth, [name]: text });
                                }}
                                secureTextEntry
                            />
                        </View>
                        <View style={styles.LoginInputSection.btnWrapper}>
                            <UniversialButton
                                title={messages.messages.auth.login.title_of_login_btn}
                                titleStyle={styles.LoginInputSection.btnTitle}
                                onPress={() => loginManager.naver.logout()}
                                //onPress={() => LoginManager.stardusts.login()}
                                disabled={false}
                            />
                        </View>
                        <Pressable
                            style={styles.LoginInputSection.socialLoginBtn}
                            onPress={() => handleLogin("naver")}
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
                                        /*navigation.navigate(
                                    "create_account",
                                    {
                                        host: "villife",
                                        access_token: null,
                                    }*/
                                        handleLogin("naver");
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
                                    ]}>
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
