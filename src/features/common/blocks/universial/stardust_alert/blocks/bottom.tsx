import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import useStardustAlertStyles from "../styles";
import { useEffect } from "react";
import { AlertButton, StardustAlertProps } from "../types";

type StardustAlertBottomProps = {
    buttons?: StardustAlertProps["buttons"];
    setAlert: StardustAlertProps["setAlert"];
    styles: ReturnType<typeof useStardustAlertStyles>["bottom"];
};

export default function StardustAlertBottom(props: StardustAlertBottomProps) {
    useEffect(() => {
        if (props.buttons === undefined) return;
        if (props.buttons.length > 2) {
            console.warn("[StardustAlert]", 'The maximum number of buttons that "StardustAlert" can render is two.');
        }
    }, []);

    return (
        <View style={props.styles.container}>
            {props.buttons ? (
                props.buttons.map((button, index) => (
                    <StardustAlertButton
                        key={index}
                        index={index}
                        styles={props.styles}
                        text={button.text}
                        onPress={button.onPress}
                    />
                ))
            ) : (
                <StardustAlertButton
                    styles={props.styles}
                    index={-1}
                    text="OK"
                    onPress={() =>
                        props.setAlert({
                            visible: false,
                            title: "",
                        })
                    }
                />
            )}
        </View>
    );
}

type StardustAlertButtonProps = AlertButton & {
    index: number;
    styles: StardustAlertBottomProps["styles"];
};
function StardustAlertButton(props: StardustAlertButtonProps) {
    const borderRight =
        props.index % 2 == 0
            ? {
                  borderRightWidth: props.styles.buttonOption.borderRightWidth,
                  borderColor: props.styles.buttonOption.borderColor,
              }
            : {};
    return (
        <TouchableHighlight
            style={[props.styles.button, borderRight]}
            activeOpacity={0.6}
            underlayColor={props.styles.buttonOption.backgroundColor}
            onPress={() => props.onPress && props.onPress(props.text)}>
            <Text style={props.styles.text}>{props.text}</Text>
        </TouchableHighlight>
    );
}
