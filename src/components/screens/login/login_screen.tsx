import { Text, View } from "react-native";
import useScreenMessage from "../../../hooks/screen_message";


export default function LoginScreen() {
    const Messages = useScreenMessage("korean");

    return (
        <View>
            <Text>
                {Messages.messages.authSM.login.pageName}
            </Text>
        </View>
    );
}