import { Platform, StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useHomeContentFromParkingStyles(didGetFavoritVehilce: boolean) {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            paddingVertical: didGetFavoritVehilce ? deviceUI.moderateScale(8) : deviceUI.moderateScale(15),
        },
        textBox: {
            flex: 2,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: deviceUI.moderateScale(20),
            marginBottom: deviceUI.moderateScale(4),
        },
        printWrapper: {
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start",
        },
        dateWrapper: {
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
        },
        text: {
            color: theme.colorFamily.black,
            fontWeight: "bold",
            ...theme.font.researved.h4,
        },
        btnBox: {
            flex: 8,
            flexDirection: "row",
            paddingHorizontal: deviceUI.moderateScale(5),
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
