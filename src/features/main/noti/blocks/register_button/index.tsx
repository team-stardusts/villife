import { ActivityIndicator, TouchableOpacity, View, Text } from "react-native";
import useNotiRegisterButtonStyles from "./styles";
import NotiRegisterButtonProps from "./type";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";

export default function RegisterButton(props: NotiRegisterButtonProps): JSX.Element {
    const styles = useNotiRegisterButtonStyles();
    const Message = useScreenMessage();

    return (
        <View style={styles.RegisterButton}>
            <TouchableOpacity
                onPress={() => {
                    props.onSubmit();
                }}>
                {props.loading ? <ActivityIndicator size={"large"} /> : <Text>{Message.messages.words.register}</Text>}
            </TouchableOpacity>
        </View>
    );
}
