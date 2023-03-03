import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import { useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import StardustsRestAPI from "../../../../hooks/external/rests/stardusts";
import useScreenMessage from "../../../../hooks/internal/multilingual/hooks";
import UniversalButton from "../../../atoms/button/universial_button";
import UniversalTextInput from "../../../atoms/textinput/universal_textinput";
import { AuthStackParamList } from "../../../block/navigators/auth/types";
import useJoinScreenStyles from "./styles";

type JoinScreenProps = NativeStackScreenProps<AuthStackParamList, "join">

export default function JoinScreen({navigation, route}: JoinScreenProps) {
    const message = useScreenMessage();
    const styles = useJoinScreenStyles();
    const server = new StardustsRestAPI();
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
            <View style={styles.PageTitleSection.topLevelBox}>
                <Text style={styles.PageTitleSection.text}>
                    {message.messages.auth.join.identification}
                </Text>
            </View>
            <View style={styles.JoinInputSection.topLevelBox}>
                <View>
                    <View>
                        <Text>
                            {message.messages.auth.join.title_of_name_input}
                        </Text>
                        <UniversalTextInput />
                    </View>
                    <View>
                        <Text>
                            {message.messages.auth.join.title_of_birth_input}
                        </Text>
                        <UniversalTextInput />
                    </View>
                    <View>
                        <Text>
                            {message.messages.auth.join.title_of_select_carrier_input}
                        </Text>
                        <UniversalTextInput />
                    </View>
                    <View>
                        <UniversalButton 
                            title={message.messages.auth.join.title_of_send_btn}
                            titleStyle={{}}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.BlankSection.topLevelBox}>
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