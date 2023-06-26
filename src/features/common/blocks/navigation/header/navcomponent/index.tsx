import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useSystemInfo from "../../../../hooks/systeminfo/hooks";
import useAppThemeLegacy from "../../../../hooks/themes_legacy/hooks";
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
                    ? theme.font.fontFamilies.pretendard.regular
                    : theme.font.fontFamilies.pretendard.bold,
            color: theme.colorFamily.black,
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.contentsWrapper} onPress={props.onPress}>
                {props.iconName && (
                    <View style={styles.atomBox}>
                        <Icon name={props.iconName} size={deviceUI.moderateScale(45)} color={theme.colorFamily.black} />
                    </View>
                )}
                <View style={styles.atomBox}>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
