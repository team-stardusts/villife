import { Button, Pressable, SafeAreaView, Text, View } from "react-native";
import UniversalTextInput from "../../atoms/textinput/universal_textinput";
import UniversalButton from "../../atoms/button/universial_button";
import useScreenMessage from "../../../hooks/internal/multilingual/hooks";
import LoginScreenTypes from "./types";
import useLoginScreenStyles from "./styles";
import { useRecoilState } from "recoil";
import { testState } from "../../../hooks/states/atoms/test";
import { useEffect, useState } from "react";
import useSystemInfo from "../../../hooks/internal/systeminfo/hooks";
import SocialLoginIcon from "../../block/icon/login_icon";


type UserAuth = {
    id: string | null,
    password: string | null,
}


export default function LoginScreen() {
    const iconSize: number = useSystemInfo().window.width * 0.135;
    const Messages = useScreenMessage("korean");
    const styles: LoginScreenTypes.LoginScreenStylesType = useLoginScreenStyles();
    const [auth, setAuth] = useState<UserAuth>({
        id: null,
        password: null
    })


    return (
        <SafeAreaView style={styles.Page.topLevelBox}>
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
            <View style={styles.LoginInputSection.topLevelBox}>
                <View style={styles.LoginInputSection.attrWrapper}>
                    <View style={styles.LoginInputSection.inputWrapper}>
                        <Text style={styles.LoginInputSection.inputIdentifier}>
                            {Messages.messages.auth.login.title_of_id_input}
                        </Text>
                        <UniversalTextInput 
                            style={
                                styles.LoginInputSection.input
                            }
                            name="id"
                            onChangeText={(name, text) => {
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
                            style={
                                styles.LoginInputSection.input
                            }
                            name="password"
                            onChangeText={(name, text) => {
                                if (name === "password")
                                setAuth({...auth, [name]: text})
                            }}
                            />
                    </View>
                    <View style={styles.LoginInputSection.btnWrapper}>
                        <UniversalButton 
                            title={Messages.messages.auth.login.title_of_login_btn}
                            titleStyle={styles.LoginInputSection.btnTitle}
                            style={styles.LoginInputSection.btn}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.JoinLinkSection.topLevelBox}>
                <View style={styles.JoinLinkSection.textWrapper}>
                    <Text style={styles.JoinLinkSection.text}>
                        {Messages.messages.auth.login.join}
                    </Text>
                    <Text style={styles.JoinLinkSection.text}>
                        |
                    </Text>
                    <Text style={styles.JoinLinkSection.text}>
                        {Messages.messages.auth.login.reset_password}
                    </Text>
                </View>
            </View>
            <View style={styles.SocialLoginSection.topLevelBox}>
                <View style={styles.SocialLoginSection.iconsWrapper}>
                    <SocialLoginIcon    
                        providerName="kakao"
                        width={iconSize} 
                        height={iconSize}/>
                    <SocialLoginIcon 
                        providerName="naver"
                        width={iconSize} 
                        height={iconSize}/>
                    <SocialLoginIcon 
                        providerName="google"
                        width={iconSize} 
                        height={iconSize}/>
                </View>
            </View>
        </SafeAreaView>
    );
}