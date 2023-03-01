import axios from "axios";
import { SafeAreaView, Text, View } from "react-native";
import StardustsRestAPI from "../../../../hooks/external/rests/stardusts";
import UniversalButton from "../../../atoms/button/universial_button";

export default function JoinScreen({navigation}: any) {
    const server = new StardustsRestAPI();
    const handleJoin = async() => {
        const result = await server.socialJoin("naver", {
            id: "dnsi37",
            password: "testpassword1!",
            access_token: "AAAANvJAi3gLF2h5RO4jWj6kNmi2li930TLhzkyLN9H_j-227mHcH3REuuRvxLQ3zg3tzclSNmKToJa_oVJ0jz3rRb0",
            phone_number: "010-5502-7723",
        });
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