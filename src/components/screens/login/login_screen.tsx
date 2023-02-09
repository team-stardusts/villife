import { SafeAreaView, Text, View } from "react-native";
import BasicTextInput from "../../atoms/textinput/basic_textinput";
import useScreenMessage from "../../../hooks/internal/multilingual/hooks";
import LoginScreenStyles, {LoginScreenStylesType} from "./styles";

const styles: LoginScreenStylesType = LoginScreenStyles;

export default function LoginScreen() {
    const Messages = useScreenMessage("korean");

    return (
        <SafeAreaView>
            <View>
                <View style={styles.GreetingSection.box}>
                    <Text>
                        {Messages.messages.auth.login.request_login.line_1}
                    </Text>
                    <Text>
                        {Messages.messages.auth.login.request_login.line_2}
                    </Text>
                </View>
                <View style={{flex: 1}}>
                    <Text>
                        {Messages.messages.auth.login.title_of_id_input}
                    </Text>
                    <BasicTextInput onChangeText={(n, e) => console.log(n, e)}/>
                </View>
                <View>
                    <Text>
                        {Messages.messages.auth.login.title_of_password_input}
                    </Text>
                    <BasicTextInput name="password"/>
                </View>
                <View>
                    <Text>
                        {Messages.messages.auth.login.join}
                    </Text>
                    <Text>
                        {Messages.messages.auth.login.reset_password}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}