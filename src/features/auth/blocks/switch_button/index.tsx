import { GestureResponderEvent, Pressable, View } from "react-native";
import useAuthScreenSwitchButtonStyles from "./styles";
import AuthScreenSwitchButtonProps from "./types";

export default function AuthScreenSwitchButton(props: AuthScreenSwitchButtonProps): JSX.Element {
    const Styles = useAuthScreenSwitchButtonStyles();

    const onPress = (e: GestureResponderEvent) => {
        if (props.onPress) {
            props.onPress(e);
        }
    };

    return (
        <>
            {props.disabled ? (
                <>
                    <Pressable onPress={onPress}>
                        <View style={Styles.onWidthBar}>
                            <View style={Styles.onCircleInBar} />
                        </View>
                    </Pressable>
                </>
            ) : (
                <>
                    <Pressable onPress={onPress}>
                        <View style={Styles.offWidthBar}>
                            <View style={Styles.offCircleInBar} />
                        </View>
                    </Pressable>
                </>
            )}
        </>
    );
}
