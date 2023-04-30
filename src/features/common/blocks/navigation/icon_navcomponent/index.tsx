import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useSystemInfo from "../../../hooks/systeminfo/hooks";
import useAppThemeLegacy from "../../../hooks/themes_legacy/hooks";
import Icon from "../../../atoms/icon";
import { IconNavComponentProps } from "./types";

export default function IconNavComponent(props: IconNavComponentProps) {
    const theme = useAppThemeLegacy();
    const sysinfo = useSystemInfo();

    const styles = StyleSheet.create({
        toplevelBox: {
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
        caption: {
            fontSize: sysinfo.window.height * 0.015,
            color: theme.colors.colorFamily.black,
        },
    });

    return (
        <View style={styles.toplevelBox}>
            <TouchableOpacity style={styles.contentsWrapper} onPress={props.onPress}>
                <View style={styles.atomBox}>
                    <Icon
                        name={props.iconName}
                        size={sysinfo.window.height * 0.055}
                        color={theme.colors.colorFamily.black}
                    />
                </View>
                <View style={styles.atomBox}>
                    <Text style={styles.caption}>{props.caption}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
