import { Text, TouchableOpacity, View } from "react-native";
import useNextButtonStyles from "./styles";
import { NextButtonProps } from "./types";
import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";

export default function NextButton({ disabled, onPress }: NextButtonProps) {
    const styles = useNextButtonStyles();
    const messages = useScreenMessage().messages;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.6}
                disabled={disabled}
                onPress={() => {
                    onPress();
                }}>
                <Text style={styles.text}>{messages.words.next}</Text>
            </TouchableOpacity>
        </View>
    );
}
