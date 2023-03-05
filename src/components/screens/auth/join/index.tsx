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
import useJoinScreenStyles from "./styles";

type JoinScreenProps = NativeStackScreenProps<AuthStackParamList, "join">

type UserAuth = {
    id: string | null,
    password: string | null,
}

type InputResponsibleStype = {
    borderColor: string;
    borderWidth: number;
}

export default function JoinScreen({navigation, route}: JoinScreenProps) {
    const { host, access_token } = route.params;
    const Theme = useAppTheme();
    const SystemInfo = useSystemInfo();
    const Messages = useScreenMessage();
    const styles = useJoinScreenStyles();
    const server = new StardustsRestAPI();

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
        console.log(route.params)
    }, [])

    return (
        <SafeAreaView style={styles.Page.topLevelBox}>
            <View style={styles.Page.contentsWrapper}>
                <View style={styles.PageTitleSection.topLevelBox}>
                    <View style={styles.PageTitleSection.textWrapper}>
                        <Text style={styles.PageTitleSection.text}>
                            {Messages.messages.auth.join.identification}
                        </Text>
                    </View>
                </View>
                <View style={styles.JoinInputSection.topLevelBox}>
                    <View style={styles.JoinInputSection.attrWrapper}>
                        <View style={styles.JoinInputSection.inputWrapper}>
                            <Text style={styles.JoinInputSection.inputIdentifier}>
                                {Messages.messages.auth.join.title_of_name_input}
                            </Text>
                            <UniversalTextInput 
                                style={[
                                    styles.JoinInputSection.input,
                                    idInputResponsibleStyle,
                                ]}
                                name="id"
                                onChangeText={(name, text) =>{}}
                                onFocus={() => setIdResponsableStyle(inputSelectedStyle)}
                                onBlur={() => setIdResponsableStyle(inputUnselectedStyle)}
                                />
                        </View>
                        <View style={styles.JoinInputSection.inputWrapper}>
                            <Text style={styles.JoinInputSection.inputIdentifier}>
                                {Messages.messages.auth.join.title_of_birth_input}
                            </Text>
                            <UniversalTextInput 
                                style={[
                                    styles.JoinInputSection.input,
                                    pwInputResponsibleStyle,
                                ]}
                                name="password"
                                onChangeText={(name, text) =>{}}
                                onFocus={() => setPwResponsableStyle(inputSelectedStyle)}
                                onBlur={() => setPwResponsableStyle(inputUnselectedStyle)}
                                />
                        </View>
                        <View style={styles.JoinInputSection.inputWrapper}>
                            <Text style={styles.JoinInputSection.inputIdentifier}>
                                {Messages.messages.auth.join.title_of_birth_input}
                            </Text>
                            <UniversalTextInput 
                                style={[
                                    styles.JoinInputSection.input,
                                    birthInputResponsibleStyle,
                                ]}
                                name="birth"
                                onChangeText={(name, text) =>{}}
                                onFocus={() => setBirthResponsableStyle(inputSelectedStyle)}
                                onBlur={() => setBirthResponsableStyle(inputUnselectedStyle)}
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
                        <View style={styles.JoinInputSection.btnWrapper}>
                            <UniversalButton
                                title={Messages.messages.auth.join.title_of_send_btn}
                                titleStyle={styles.JoinInputSection.btnTitle}
                                style={styles.JoinInputSection.btn}
                                onPress={() => {}}
                                disabled={false}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.BlankSection.topLevelBox}>
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