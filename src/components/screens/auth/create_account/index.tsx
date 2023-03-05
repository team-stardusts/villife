import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import StardustsRestAPI from "../../../../libs/rest_apis/stardusts";
import useScreenMessage from "../../../../hooks/multilingual/hooks";
import useSystemInfo from "../../../../hooks/systeminfo/hooks";
import useAppTheme from "../../../../hooks/themes/hooks";
import UniversalButton from "../../../atoms/button/universial_button";
import UniversalTextInput from "../../../atoms/textinput/universal_textinput";
import { AuthStackParamList } from "../../../block/navigators/auth/types";
import useCreateAccountScreenStyles from "./styles";

type JoinScreenProps = NativeStackScreenProps<AuthStackParamList, "create_account">

type AccountType = {
    id: string | null,
    password: string | null,
    confirm_password: string | null,
}

type InputResponsibleStype = {
    borderColor: string;
    borderWidth: number;
}

export default function CreateAccountScreen({navigation, route}: JoinScreenProps) {
    const { host, access_token } = route.params;
    const Theme = useAppTheme();
    const SystemInfo = useSystemInfo();
    const Messages = useScreenMessage();
    const styles = useCreateAccountScreenStyles();
    const server = new StardustsRestAPI();

    const [account, setAccount] = useState<AccountType>({
        id: null,
        password: null,
        confirm_password: null,
    })

    const inputSelectedStyle: InputResponsibleStype = {
        borderColor: Theme.colors.colorFamily.blue,
        borderWidth: SystemInfo.window.width * 0.004,
    }

    const inputUnselectedStyle: InputResponsibleStype = {
        borderColor: Theme.colors.colorFamily.lightgrey,
        borderWidth: SystemInfo.window.width * 0.002,
    }

    const [idInputResponsibleStyle, setIdResponsableStyle] = 
        useState<InputResponsibleStype>(inputUnselectedStyle)
    
    const [pwInputResponsibleStyle, setPwResponsableStyle] = 
        useState<InputResponsibleStype>(inputUnselectedStyle)

    const [birthInputResponsibleStyle, setBirthResponsableStyle] = 
        useState<InputResponsibleStype>(inputUnselectedStyle)

    const handleJoin = async() => {
        const result = await server.socialJoin("naver", {
            id: "dnsi37",
            password: "testpassword1!",
            access_token: "AAAANvJAi3gLF2h5RO4jWj6kNmi2li930TLhzkyLN9H_j-227mHcH3REuuRvxLQ3zg3tzclSNmKToJa_oVJ0jz3rRb0",
            phone_number: "010-5502-7723",
        });
    }

    useEffect(() => {
        console.log(account);
    }, [account])

    return (
        <SafeAreaView style={styles.Screen.topLevelBox}>
            <View style={styles.Screen.screenWrapper}>
                <View style={styles.TitleSection.topLevelBox}>
                    <View style={styles.TitleSection.textWrapper}>
                        <Text style={styles.TitleSection.title}>
                            {Messages.messages.auth.create_account.title}
                        </Text>
                        <Text style={styles.TitleSection.subtitle}>
                            {Messages.messages.auth.create_account.subtitle_1}
                        </Text>
                        <Text style={styles.TitleSection.subtitle}>
                            {Messages.messages.auth.create_account.subtitle_2}
                        </Text>
                    </View>
                </View>
                <View style={styles.ContentsSection.topLevelBox}>
                    <View style={styles.AccountInputSection.topLevelBox}>
                        <View style={styles.AccountInputSection.attrWrapper}>
                            <View style={styles.AccountInputSection.inputWrapper}>
                                <Text style={styles.AccountInputSection.inputIdentifier}>
                                    {Messages.messages.auth.create_account.name_input_title}
                                </Text>
                                <UniversalTextInput 
                                    style={[
                                        styles.AccountInputSection.input,
                                        idInputResponsibleStyle,
                                    ]}
                                    name="id"
                                    onChangeText={(name, text) =>{
                                        if (name === "id")
                                        setAccount({...account, [name]: text})
                                    }}
                                    onFocus={() => setIdResponsableStyle(inputSelectedStyle)}
                                    onBlur={() => setIdResponsableStyle(inputUnselectedStyle)}
                                    />
                            </View>
                            <View style={styles.AccountInputSection.inputWrapper}>
                                <Text style={styles.AccountInputSection.inputIdentifier}>
                                    {Messages.messages.auth.create_account.password_input_title}
                                </Text>
                                <UniversalTextInput 
                                    style={[
                                        styles.AccountInputSection.input,
                                        pwInputResponsibleStyle,
                                    ]}
                                    name="password"
                                    onChangeText={(name, text) =>{
                                        if (name === "password")
                                        setAccount({...account, [name]: text})
                                    }}
                                    onFocus={() => setPwResponsableStyle(inputSelectedStyle)}
                                    onBlur={() => setPwResponsableStyle(inputUnselectedStyle)}
                                    secureTextEntry
                                    />
                            </View>
                            <View style={styles.AccountInputSection.inputWrapper}>
                                <Text style={styles.AccountInputSection.inputIdentifier}>
                                    {Messages.messages.auth.create_account.confirm_password_input_title}
                                </Text>
                                <UniversalTextInput 
                                    style={[
                                        styles.AccountInputSection.input,
                                        birthInputResponsibleStyle,
                                    ]}
                                    name="confirm_password"
                                    onChangeText={(name, text) =>{
                                        if (name === "confirm_password")
                                        setAccount({...account, [name]: text})
                                    }}
                                    onFocus={() => setBirthResponsableStyle(inputSelectedStyle)}
                                    onBlur={() => setBirthResponsableStyle(inputUnselectedStyle)}
                                    secureTextEntry
                                    />
                            </View>
                            {
                                host === "stardusts"
                                ? <View>
                                    <Text>
                                        {Messages.messages.auth.join.title_of_select_carrier_input}
                                    </Text>
                                    <UniversalTextInput />
                                </View>
                                :<></>
                            }
                            <View style={styles.AccountInputSection.btnWrapper}>
                                <UniversalButton
                                    title={Messages.messages.auth.join.title_of_send_btn}
                                    titleStyle={styles.AccountInputSection.btnTitle}
                                    style={styles.AccountInputSection.btn}
                                    onPress={() => {}}
                                    disabled={false}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.BlankSection.topLevelBox}>
                    </View>
                </View>
            </View>
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