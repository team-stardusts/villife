import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import StardustsRestAPI from "../../../../libs/rest_apis/stardusts";
import useScreenMessage from "../../../../hooks/multilingual/hooks";
import useSystemInfo from "../../../../hooks/systeminfo/hooks";
import useAppTheme from "../../../../hooks/themes/hooks";
import UniversialButton from "../../../blocks/universial/button";
import UniversalTextInput from "../../../blocks/universial/textinput";
import { AuthStackParamList } from "../../../navigators/auth/types";
import useCreateAccountScreenStyles from "./styles";
import AuthScreenTitleView from "../../../blocks/auth_screens/title_view";
import AuthScreenBottonButton from "../../../blocks/auth_screens/bottom_button";
import CreateAccountScreenProps from "./types";


type AccountType = {
    id: string | null,
    password: string | null,
    confirm_password: string | null,
}

export default function CreateAccountScreen({navigation, route}: CreateAccountScreenProps) {
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
                <AuthScreenTitleView
                    title={Messages.messages.auth.create_account.title}
                    subtitles={[
                        Messages.messages.auth.create_account.subtitle_1,
                        Messages.messages.auth.create_account.subtitle_2,  
                    ]}
                />
                {/*
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
                */}
                <View style={styles.ContentsSection.topLevelBox}>
                    <View style={styles.AccountInputSection.topLevelBox}>
                        <View style={styles.AccountInputSection.attrWrapper}>
                            <View style={styles.AccountInputSection.inputWrapper}>
                                <Text style={styles.AccountInputSection.inputIdentifier}>
                                    {Messages.messages.auth.create_account.name_input_title}
                                </Text>
                                <UniversalTextInput
                                    name="id"
                                    onChangeText={(text, name) =>{
                                        if (name === "id")
                                        setAccount({...account, [name]: text})
                                    }}
                                    placeholder={Messages.messages.auth.create_account.name_input_placeholder}
                                    />
                            </View>
                            <View style={styles.AccountInputSection.inputWrapper}>
                                <Text style={styles.AccountInputSection.inputIdentifier}>
                                    {Messages.messages.auth.create_account.password_input_title}
                                </Text>
                                <UniversalTextInput 
                                    name="password"
                                    onChangeText={(text, name) =>{
                                        if (name === "password")
                                        setAccount({...account, [name]: text})
                                    }}
                                    placeholder={Messages.messages.auth.create_account.password_input_placeholder}
                                    secureTextEntry
                                    />
                            </View>
                            <View style={styles.AccountInputSection.inputWrapper}>
                                <Text style={styles.AccountInputSection.inputIdentifier}>
                                    {Messages.messages.auth.create_account.confirm_password_input_title}
                                </Text>
                                <UniversalTextInput
                                    name="confirm_password"
                                    onChangeText={(text, name) =>{
                                        if (name === "confirm_password")
                                        setAccount({...account, [name]: text})
                                    }}
                                    placeholder={Messages.messages.auth.create_account.confirm_password_input_placeholder}
                                    secureTextEntry
                                    />
                            </View>
                            {
                                host === "stardusts"
                                ? <>
                                    <View>
                                        <Text>
                                            {Messages.messages.auth.join.title_of_select_carrier_input}
                                        </Text>
                                        <UniversalTextInput />
                                    </View>
                                    <View style={styles.AccountInputSection.btnWrapper}>
                                        <UniversialButton
                                            title={Messages.messages.auth.join.title_of_send_btn}
                                            titleStyle={styles.AccountInputSection.btnTitle}
                                            onPress={() => {}}
                                            disabled={false}
                                        />
                                    </View>
                                </>
                                : <></>
                            }
                        </View>
                    </View>
                    <View style={styles.BlankSection.topLevelBox}>
                    </View>
                </View>
            </View>
            <AuthScreenBottonButton 
                title={Messages.messages.auth.create_account.next_btn_title}
                onPress={() => navigation.navigate("set_building", {})}
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