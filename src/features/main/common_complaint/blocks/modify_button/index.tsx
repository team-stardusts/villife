import { ActivityIndicator, TouchableOpacity, View, Text } from "react-native";
import useNotiModifyButtonStyles from "./styles";
import NotiModifyButtonProps from "./type";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";

export default function ModifyButton(props: NotiModifyButtonProps) {
    const messages = useScreenMessage();
    const styles = useNotiModifyButtonStyles();

    return (
        <View style={styles.modifyButton}>
            <TouchableOpacity
                onPress={() => {
                    props.onSubmit();
                }}>
                {props.loading ? (
                    <ActivityIndicator size={"large"} />
                ) : (
                    <Text style={styles.modifyText}>{messages.messages.words.modify}</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}
