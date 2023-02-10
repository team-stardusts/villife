import { Button, SafeAreaView, Text, View } from "react-native";
import BasicTextInput from "../../atoms/textinput/basic_textinput";
import useScreenMessage from "../../../hooks/internal/multilingual/hooks";
import LoginScreenTypes from "./types";
import useLoginScreenStyles from "./styles";


export default function LoginScreen() {
    const Messages = useScreenMessage("korean");
    const styles: LoginScreenTypes.LoginScreenStylesType = useLoginScreenStyles();

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
                        <BasicTextInput 
                            style={
                                styles.LoginInputSection.input
                            }
                            onChangeText={(n, e) => console.log(n, e)}/>
                    </View>
                    <View style={styles.LoginInputSection.inputWrapper}>
                        <Text style={styles.LoginInputSection.inputIdentifier}>
                            {Messages.messages.auth.login.title_of_password_input}
                        </Text>
                        <BasicTextInput
                            style={
                                styles.LoginInputSection.input
                            }
                            name="password"/>
                    </View>
                    <View style={styles.LoginInputSection.btnWrapper}>
                        <Button title={Messages.messages.auth.login.pageName}></Button>
                    </View>
                </View>
            </View>
            <View style={styles.JoinLinkSection.topLevelBox}>
                <Text>
                    {Messages.messages.auth.login.join}
                </Text>
                <Text>
                    {Messages.messages.auth.login.reset_password}
                </Text>
            </View>
            <View style={styles.SocialLoginSection.topLevelBox}>
                <View>
                    <Text>Kakao</Text>
                    <Text>Kakao</Text>
                    <Text>Kakao</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}