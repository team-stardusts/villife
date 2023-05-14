import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useSystemInfo from "../../../hooks/systeminfo/hooks";
import useAppThemeLegacy from "../../../hooks/themes_legacy/hooks";
import Icon from "../../../atoms/icon";
import { SimpleNavComponentProps } from "./types";

export default function SimpleNavComponent(props: SimpleNavComponentProps) {
    const theme = useAppThemeLegacy();
    const sysinfo = useSystemInfo();

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
            fontSize: sysinfo.window.height * 0.015,
            color: theme.colors.colorFamily.black,
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.contentsWrapper} onPress={props.onPress}>
                {props.iconName && (
                    <View style={styles.atomBox}>
                        <Icon
                            name={props.iconName}
                            size={sysinfo.window.height * 0.055}
                            color={theme.colors.colorFamily.black}
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
