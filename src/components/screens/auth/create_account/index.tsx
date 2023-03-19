import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import Villife from "../../../../libs/rest_apis/villife";
import useScreenMessage from "../../../../hooks/multilingual/hooks";
import useSystemInfo from "../../../../hooks/systeminfo/hooks";
import useAppTheme from "../../../../hooks/themes/hooks";
import UniversialButton from "../../../blocks/universial/button";
import useCreateAccountScreenStyles from "./styles";
import AuthScreenTitleView from "../../../blocks/auth_screens/title_view";
import AuthScreenBottonButton from "../../../blocks/auth_screens/bottom_button";
import CreateAccountScreenProps from "./types";
import AuthScreenCommonInput from "../../../blocks/auth_screens/input";
import StringValidator from "../../../../libs/string_validator";
import { useLoginService } from "../../../../hooks/services/hooks";


type AccountType = {
    id: string | null,
    password: string | null,
    confirm_password: string | null,
}

export default function CreateAccountScreen({navigation, route}: CreateAccountScreenProps) {
    const { host, access_token } = route.params;
    const Theme = useAppTheme();
    const SystemInfo = useSystemInfo();
    const LoginManager = useLoginService();
    const Messages = useScreenMessage();
    const styles = useCreateAccountScreenStyles();
    const Server = new Villife();
    const Validator = new StringValidator();
    
    const [account, setAccount] = useState<AccountType>({
        id: null,
        password: null,
        confirm_password: null,
    })

    const [isDone, setIsDone] = useState<boolean>(false)

    const handleJoin = async() => {
        const {id, password} = account;

        if (id && password && access_token) {
            const result = await LoginManager[host].join(id, password, access_token);
            console.log(result.isSuccess);
            console.log(result.data);

            navigation.navigate("set_building", {id, password})
        }
        /*
        const result = await Server.socialJoin("naver", {
            id: "dnsi37",
            password: "testpassword1!",
            access_token: "AAAANvJAi3gLF2h5RO4jWj6kNmi2li930TLhzkyLN9H_j-227mHcH3REuuRvxLQ3zg3tzclSNmKToJa_oVJ0jz3rRb0",
            //phone_number: "010-5502-7723",
        });
        */
    }

    const validateAccount = (): void => {
        const { id, password, confirm_password } = account;

        // 입력 값이 하나라도 null 일 경우 pass.
        if (!(id && password && confirm_password)) {
            setIsDone(false);
            return;
        }

        if (
            (Validator.isID(id) && Validator.isPassword(password))
            && password === confirm_password
            ) {
            setIsDone(true);
        }
        else {
            setIsDone(false);
        }
    }

    useEffect(() => {
        validateAccount();
    }, [account])

    return (
        <SafeAreaView style={styles.Screen.topLevelBox}>
            <View style={styles.Screen.screenWrapper}>
                <AuthScreenTitleView
                    title={Messages.messages.auth.create_account.title}
                    subtitles={[
                        Messages.messages.auth.create_account.subtitle_1,
                        Messages.messages.auth.create_account.subtitle_2,  
                    ]}
                />
                <View style={styles.Screen.contentsWrapper}>
                    <View style={styles.InputsSection.topLevelBox}>
                        <View style={styles.InputsSection.inputsWrapper}>
                            <View style={styles.InputsSection.attrWrapper}>
                                <AuthScreenCommonInput
                                    name="id"
                                    title={Messages.messages.auth.create_account.name_input_title}
                                    onChangeText={(text, name) =>{
                                        if (name === "id")
                                        setAccount({...account, [name]: text})
                                    }}
                                    placeholder={Messages.messages.auth.create_account.name_input_placeholder}
                                    />
                                <AuthScreenCommonInput 
                                    name="password"
                                    title={Messages.messages.auth.create_account.password_input_title}
                                    onChangeText={(text, name) =>{
                                        if (name === "password")
                                        setAccount({...account, [name]: text})
                                    }}
                                    placeholder={Messages.messages.auth.create_account.password_input_placeholder}
                                    secureTextEntry
                                    />
                                <AuthScreenCommonInput
                                    name="confirm_password"
                                    title={Messages.messages.auth.create_account.confirm_password_input_title}
                                    onChangeText={(text, name) =>{
                                        if (name === "confirm_password")
                                        setAccount({...account, [name]: text})
                                    }}
                                    highlightColor={
                                        account.password === account.confirm_password
                                        ? undefined
                                        : "red"
                                    }
                                    lowlightColor={
                                        account.password === account.confirm_password
                                        ? undefined
                                        : "red"
                                    }
                                    placeholder={Messages.messages.auth.create_account.confirm_password_input_placeholder}
                                    secureTextEntry
                                    />
                                {
                                    host === "stardusts"
                                    ? <>
                                        <AuthScreenCommonInput 
                                            title={Messages.messages.auth.join.title_of_select_carrier_input}
                                            />
                                        <View style={styles.InputsSection.btnWrapper}>
                                            <UniversialButton
                                                title={Messages.messages.auth.join.title_of_send_btn}
                                                titleStyle={styles.InputsSection.btnTitle}
                                                onPress={() => {}}
                                                disabled={false}
                                            />
                                        </View>
                                    </>
                                    : <></>
                                }
                            </View>
                        </View>
                    </View>
                    <View style={styles.BlankSection.topLevelBox}>
                    </View>
                </View>
            </View>
            <AuthScreenBottonButton 
                title={Messages.messages.auth.create_account.next_btn_title}
                onPress={() => {
                    handleJoin();
                }}
                disabled={!isDone}
                />
        </SafeAreaView>
    )
}

/*
                <View>
                    <UniversalButton
                        title="NaverJoinTest" 
                        titleStyle={{fontSize: 20}}
                        onPress={() => handleJoin()}
                        />
                </View>
*/