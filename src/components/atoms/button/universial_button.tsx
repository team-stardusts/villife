import { useState } from "react";
import { GestureResponderEvent, Pressable, Text } from "react-native";
import useAppTheme from "../../../hooks/internal/themes/hooks";
import { UniversalButtonProps } from "./types";


export default function UniversalButton(props: UniversalButtonProps): JSX.Element {
    const Theme = useAppTheme();
    const [isPressd, setIsPressed] = useState<boolean>(false);
    const pressedColor: string = props.pressedBgColor || Theme.colors.colorFamily.lightblue;
    const unpressedColor: string = props.bgColor || Theme.colors.colorFamily.blue;
    const titleStyle: object = props.titleStyle || {
        color: Theme.colors.colorFamily.white,
    }
    const style: object = props.style? props.style : {};


    const onPress = (e: GestureResponderEvent) => {
        if (props.onPress) {
            props.onPress(e);
        }
    }

    return (
        <Pressable 
            style={{
                ...style, 
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isPressd ? pressedColor : unpressedColor
            }}
            onPress={onPress}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            >
            <Text style={titleStyle}>{props.title}</Text>
        </Pressable>
    )
}