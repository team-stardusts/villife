import { Platform, StyleSheet, View } from "react-native";
import { ContentBoxProps } from "./types";
import useStyler from "../../hooks/styler/hooks";

export default function ContentBox({ children, backgroundColor }: ContentBoxProps) {
    const { deviceUI, theme } = useStyler();

    const styles = StyleSheet.create({
        box: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: deviceUI.moderateScale(15),
            marginBottom: deviceUI.moderateScale(15),
            backgroundColor: backgroundColor ?? theme.colorFamily.blue,
            ...Platform.select({
                ios: {
                    shadowColor: theme.colorFamily.darkgrey,
                    shadowOpacity: 0.3,
                    shadowRadius: deviceUI.moderateScale(2),
                    shadowOffset: {
                        height: 6,
                        width: 0,
                    },
                },
                android: {
                    elevation: 5,
                },
            }),
        },
    });
    return <View style={styles.box}>{children !== undefined ? children : <></>}</View>;
}
