import { useState } from "react";
import { GestureResponderEvent, Text } from "react-native";
import Button from "../../../atoms/button";
import useUniversialButtonStyles from "./styles";
import UniversialButtonProps from "./types";


export default function UniversialButton(props: UniversialButtonProps): JSX.Element {
    const [isPressing, setIsPressing] = useState<boolean>(false);
    const {
        buttonColor,
        borderRadius,
        pressedButtonColor,
        disabledButtonColor,
        disabled,
    } = props;

    const Style = useUniversialButtonStyles({
        buttonColor,
        borderRadius,
        pressedButtonColor,
        disabledButtonColor,
        isPressing,
        disabled,

    })

    const titleStyle: any = props.titleStyle || undefined;
    
    const onPressIn = (e: GestureResponderEvent) => {
        setIsPressing(true);

        if (props.onPressIn) {
            props.onPressIn(e);
        }
    }

    const onPressOut = (e: GestureResponderEvent) => {
        setIsPressing(false);

        if (props.onPressOut) {
            props.onPressOut(e);
        }
    }

    return (
        <Button
            style={Style.view}
            titleStyle={[titleStyle, Style.text]}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            {...props}
        />
    )
}