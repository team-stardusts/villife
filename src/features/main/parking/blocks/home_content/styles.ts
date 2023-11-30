import { Platform, StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useHomeContentFromParkingStyles(didGetFavoritVehilce: boolean) {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            //paddingVertical: didGetFavoritVehilce ? deviceUI.moderateScale(8) : deviceUI.moderateScale(15),
        },
        textBox: {
            flex: 2,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            //paddingHorizontal: deviceUI.moderateScale(20),
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
            ...theme.font.researved.h4,
            fontFamily: theme.font.fontFamily.pretendard.regular,
            color: theme.color.specified.black,
        },
        btnBox: {
            flex: 8,
            width: "100%",
            flexDirection: "row",
            //paddingHorizontal: deviceUI.moderateScale(5),
            marginLeft: deviceUI.moderateScale(12),
        },
    });

    const menu = StyleSheet.create({
        container: {
            height: "100%",
            flex: 1,
            //marginHorizontal: deviceUI.moderateScale(7),
            marginRight: deviceUI.moderateScale(12),
            borderRadius: deviceUI.moderateScale(10),
            backgroundColor: theme.color.specified.white,
            justifyContent: "center",
            alignItems: "center",
            ...Platform.select({
                ios: {
                    shadowColor: theme.color.specified.darkgrey,
                    shadowOpacity: 0.1,
                    shadowRadius: deviceUI.moderateScale(3),
                    shadowOffset: {
                        height: 0,
                        width: 0,
                    },
                },
                android: {
                    shadowColor: theme.color.specified.darkgrey,
                    elevation: 2,
                },
            }),
        },
        iconBox: {
            flex: 4,
            marginBottom: deviceUI.moderateScale(10),
            justifyContent: "flex-end",
            alignItems: "center",
        },
        iconBoxPressed: {
            backgroundColor: theme.color.series.grey.level1,
        },
        icon: {
            width: deviceUI.moderateScale(45),
            color: theme.color.specified.black,
        },
        textBox: {
            flex: 6,
            justifyContent: "flex-start",
            alignItems: "center",
        },
        text: {
            textAlign: "center",
            color: theme.color.specified.black,
            ...theme.font.researved.h4,
            fontFamily: theme.font.fontFamily.pretendard.medium,
        },
    });

    return {
        main,
        menu,
    };
}
