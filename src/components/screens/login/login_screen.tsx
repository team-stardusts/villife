import { Text, View } from "react-native";
import useScreenMessage from "../../../hooks/internal/multilingual/hooks";


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