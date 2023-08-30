import { Text, TouchableOpacity, View } from "react-native";
import useScreenBottomButtonStyles from "./styles";
import ScreenBottonButtonProps from "./types";

export default function ScreenBottonButton(props: ScreenBottonButtonProps): JSX.Element {
    const styles = useScreenBottomButtonStyles();

    return (
        <TouchableOpacity
            style={[styles.container, props.disabled && styles.disabled]}
            onPress={() => props.onPress && props.onPress()}
            activeOpacity={0.6}
            disabled={props.disabled}>
            <View style={[styles.btn, props.disabled && styles.disabled]}>
                <Text style={[styles.title, props.disabled && styles.disabled]}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
}
