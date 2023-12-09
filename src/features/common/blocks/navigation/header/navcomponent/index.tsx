import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "../../../../atoms/icon";
import { SimpleNavComponentProps } from "./types";
import useStyler from "../../../../hooks/styler/hooks";

export default function SimpleNavComponent(props: SimpleNavComponentProps) {
    const { deviceUI, theme } = useStyler();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
        },
        contentsWrapper: {
            width: "70%",
            height: "90%",
            alignItems: "center",
            justifyContent: "space-around",
        },
        atomBox: {
            alignItems: "center",
            justifyContent: "center",
        },
        title: {
            fontFamily:
                props.iconName !== undefined
                    ? theme.font.fontFamily.pretendard.regular
                    : theme.font.fontFamily.pretendard.bold,
            fontSize: props.iconName !== undefined ? deviceUI.moderateScale(13) : deviceUI.moderateScale(15),
            color: theme.color.specified.black,
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.contentsWrapper} onPress={props.onPress}>
                {props.iconName && (
                    <View style={styles.atomBox}>
                        <Icon
                            name={props.iconName}
                            size={deviceUI.moderateScale(45)}
                            color={theme.color.specified.black}
                        />
                    </View>
                )}
                <View style={styles.atomBox}>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
