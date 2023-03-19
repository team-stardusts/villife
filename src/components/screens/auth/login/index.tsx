import { Pressable, SafeAreaView, Text, View } from "react-native";
import useScreenMessage from "../../../../hooks/multilingual/hooks";
import LoginScreenTypes from "./types";
import useLoginScreenStyles from "./styles";
import UniversalTextInput from "../../../blocks/universial/textinput";
import UniversialButton from "../../../blocks/universial/button";
import { useRecoilState } from "recoil";
import { testState } from "../../../../hooks/states/atoms/test";
import { useEffect, useState } from "react";
import useSystemInfo from "../../../../hooks/systeminfo/hooks";
import SocialLoginIcon from "../../../blocks/icon/login";
import useAppTheme from "../../../../hooks/themes/hooks";
import { useLoginService } from "../../../../hooks/services/hooks";
import { LoginDataType } from "../../../../hooks/storage/tables/login/types";
import { SocialLoginHostType } from "../../../../libs/rest_apis/villife/types";
import Config from "react-native-config";
import AuthScreenTitleView from "../../../blocks/auth_screens/title_view";
//import AppRoutes from '../../../../data/routes.json';


type UserAuth = {
    id: string | null,
    password: string | null,
}


export default function LoginScreen({navigation}: LoginScreenTypes.LoginScreenProps) {
    const LoginManager = useLoginService();
    const Messages = useScreenMessage();
    const Theme = useAppTheme();
    const SystemInfo = useSystemInfo();
    const styles: LoginScreenTypes.LoginScreenStylesType = useLoginScreenStyles();
    const iconDiameter: number = useSystemInfo().window.width * 0.12;
    
    const [isSocialLoginButtonPressed, setIsSocialLoginButtonPressed]
        = useState<boolean>(false)

    const [auth, setAuth] = useState<UserAuth>({
            id: null,
            password: null
        })

    const [loginData, setLoginData] = useState<LoginDataType | null>(null)

    const handleSetLoginData = async(loginData: Promise<LoginDataType | null>) => {
        loginData.then((res) => {
            setLoginData(res);
        })
    }

    const handleLogin = async(host: SocialLoginHostType) => {
        const { isSuccessful, data } = await LoginManager[host].login();
        // LoginManager.naver.login();
        
        if (isSuccessful) {
            // Navigate to home screen.
            console.log(data);
        }
        else if (!isSuccessful) {
            // Modal & Navigate to join screen.
            navigation.navigate(
                "create_account",
                {
                    host: host,
                    access_token: data.social.access_token,
                }
            );
        }
    }

    useEffect(() => {
        console.log(loginData);
    }, [loginData])

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
            <AuthScreenTitleView title={
                `${Messages.messages.auth.login.request_login.line_1}\n${Messages.messages.auth.login.request_login.line_2}`
            }/>
            <View style={styles.LoginInputSection.topLevelBox}>
                <View style={styles.LoginInputSection.attrWrapper}>
                    <View style={styles.LoginInputSection.inputWrapper}>
                        <Text style={styles.LoginInputSection.inputIdentifier}>
                            {Messages.messages.auth.login.title_of_id_input}
                        </Text>
                        <UniversalTextInput
                            name="id"
                            onChangeText={(text, name) => {
                                if (name === "id")
                                setAuth({...auth, [name]: text})
                            }}
                            />
                    </View>
                    <View style={styles.LoginInputSection.inputWrapper}>
                        <Text style={styles.LoginInputSection.inputIdentifier}>
                            {Messages.messages.auth.login.title_of_password_input}
                        </Text>
                        <UniversalTextInput
                            name="password"
                            onChangeText={(text, name) => {
                                if (name === "password")
                                setAuth({...auth, [name]: text})
                            }}
                            secureTextEntry
                            />
                    </View>
                    <View style={styles.LoginInputSection.btnWrapper}>
                        <UniversialButton
                            title={Messages.messages.auth.login.title_of_login_btn}
                            titleStyle={styles.LoginInputSection.btnTitle}
                            onPress={() => LoginManager.naver.logout()}
                            //onPress={() => LoginManager.stardusts.login()}
                            disabled={false}
                        />
                    </View>
                    <Pressable
                        style={styles.LoginInputSection.socialLoginBtn}
                        onPress={() => handleLogin("naver")}
                        onPressIn={() => setIsSocialLoginButtonPressed(true)}
                        onPressOut={() => setIsSocialLoginButtonPressed(false)}
                        >
                        <View style={styles.LoginInputSection.socialLoginBtnIconWrapper}>
                            <SocialLoginIcon 
                                providerName="naver"
                                diameter={iconDiameter}
                                />
                        </View>
                        <Text style={styles.LoginInputSection.socialLoginBtnTitle}>
                            {Messages.messages.auth.login.title_of_naver_social_login_btn}
                        </Text>
                        <View style={
                            isSocialLoginButtonPressed
                            ? styles.LoginInputSection.socialLoginPressedIn
                            : {}
                        } />
                    </Pressable>
                </View>
            </View>
            <View style={styles.JoinLinkSection.topLevelBox}>
                <View style={styles.JoinLinkSection.textWrapper}>
                    <Pressable
                        children={({pressed}: any) => (
                            <Text style={[
                                {
                                    color: pressed 
                                        ? Theme.colors.colorFamily.blue
                                        : Theme.colors.colorFamily.black,
                                    fontSize: pressed
                                        ? SystemInfo.window.width * 0.036
                                        : SystemInfo.window.width * 0.035
                                }, 
                                styles.JoinLinkSection.text
                                ]}
                                onPress={() => navigation.navigate(
                                    "create_account",
                                    {
                                        host: "stardusts",
                                        access_token: null,
                                    }
                                    )}
                                >
                                {Messages.messages.auth.login.join}
                            </Text>
                        )}
                    />
                    <Text style={[
                        {fontSize: SystemInfo.window.width * 0.035},
                        styles.JoinLinkSection.text
                        ]}>
                        |
                    </Text>
                    <Pressable
                        children={({pressed}: any) => (
                            <Text style={[
                                {
                                    color: pressed 
                                        ? Theme.colors.colorFamily.blue
                                        : Theme.colors.colorFamily.black,
                                    fontSize: pressed
                                        ? SystemInfo.window.width * 0.036
                                        : SystemInfo.window.width * 0.035
                                }, 
                                styles.JoinLinkSection.text
                                ]}>
                                {Messages.messages.auth.login.reset_password}
                            </Text>
                        )}
                    />
                </View>
            </View>
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
            </View>
        </SafeAreaView>
    );
}