import { ActivityIndicator, TouchableOpacity, View, Text } from "react-native";
import useNotiRegisterButtonStyles from "./styles";
import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";
import SendButtonProps from "./type";

export default function SendButton(props: SendButtonProps): JSX.Element {
    const styles = useNotiRegisterButtonStyles();
    const Message = useScreenMessage();

    return (
        <View style={styles.registerButton}>
            <TouchableOpacity
                onPress={() => {
                    props.onSubmit();
                }}>
                {props.loading ? (
                    <ActivityIndicator size={"large"} />
                ) : (
                    <Text style={styles.registerText}>{Message.messages.words.register}</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}
