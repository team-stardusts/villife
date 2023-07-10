import { Platform, StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useHomeContentFromParkingStyles() {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            paddingHorizontal: deviceUI.moderateScale(10),
            paddingVertical: deviceUI.moderateScale(15),
        },
    });

    const menu = StyleSheet.create({
        container: {
            flex: 1,
            height: "100%",
            marginHorizontal: deviceUI.moderateScale(10),
            borderRadius: deviceUI.moderateScale(13),
            backgroundColor: theme.colorFamily.white,
            justifyContent: "center",
            alignItems: "center",
            ...Platform.select({
                ios: {
                    shadowColor: theme.colorFamily.darkgrey,
                    shadowOpacity: 0.4,
                    shadowRadius: deviceUI.moderateScale(3),
                    shadowOffset: {
                        height: 3,
                        width: 0,
                    },
                },
                android: {
                    elevation: 15,
                },
            }),
        },
        iconBox: {
            flex: 4,
            marginBottom: deviceUI.moderateScale(10),
            justifyContent: "flex-end",
            alignItems: "center",
        },
        icon: {
            width: deviceUI.moderateScale(45),
            color: theme.colorFamily.black,
        },
        textBox: {
            flex: 6,
            justifyContent: "flex-start",
            alignItems: "center",
        },
        text: {
            textAlign: "center",
            color: theme.colorFamily.black,
            ...theme.font.researved.h3,
        },
    });

    return {
        main,
        menu,
    };
}
