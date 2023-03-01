import axios from "axios";
import { SafeAreaView, Text, View } from "react-native";
import UniversalButton from "../../../atoms/button/universial_button";

export default function JoinScreen({navigation}: any) {
    const handleJoin = async() => {
        await axios.post("http://192.168.0.36:8080/auth/signup/naver", {
            access_token: "AAAAOYacxcfdGm7Qq_e39ZcAm9w0GvR_6AsK5P2PlcHcWE0ynxH9w88wAvbQEbuACPUMBcuSiBYRvAVYIu9ZZ_73ThA",
            id: "xkseh5424",
            password: "testpassword1!",
            phone_number: "010-8845-7517"
        })
        .then((res) => console.log(res.data))
        .catch((err: any) => console.log(err.response?.data))
    }

    return (
        <SafeAreaView>
            <View>
                <Text>
                    Join
                </Text>
            </View>
            <View>
                <UniversalButton 
                    title="NaverJoinTest" 
                    titleStyle={{fontSize: 20}}
                    onPress={() => handleJoin()}
                    />
            </View>
        </SafeAreaView>
    )
}