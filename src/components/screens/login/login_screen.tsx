import { SafeAreaView, Text, TextInput, View } from "react-native";
import useScreenMessage from "../../../hooks/internal/multilingual/hooks";


export default function LoginScreen() {
    const Messages = useScreenMessage("korean");

    return (
        <SafeAreaView>
            <View>
                <Text>
                    {Messages.messages.auth.login.request_login.line_1}
                </Text>
                <Text>
                    {Messages.messages.auth.login.request_login.line_2}
                </Text>
            </View>
            <View>
                <Text>
                    {Messages.messages.auth.login.title_of_id_input}
                </Text>
                <TextInput />
            </View>
            <View>
                <Text>
                    {Messages.messages.auth.login.title_of_password_input}
                </Text>
                <TextInput />
            </View>
            <View>
                <Text>
                    {Messages.messages.auth.login.join}
                </Text>
                <Text>
                    {Messages.messages.auth.login.reset_password}
                </Text>
            </View>
        </SafeAreaView>
    );
}