import { Platform, StyleSheet } from "react-native";
import useStyler from "../../../../../common/hooks/styler/hooks";

export default function useBuildingTenantListViewStyles() {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: deviceUI.moderateScale(3),
        },
    });

    const tenant = StyleSheet.create({
        container: {
            width: "100%",
            height: deviceUI.moderateScale(55),
            marginBottom: deviceUI.moderateScale(20),
            alignItems: "center",
        },
        wrapper: {
            height: "100%",
            width: "98%",
            flexDirection: "row",
            borderRadius: deviceUI.moderateScale(10),
            backgroundColor: theme.color.specified.white,
            ...Platform.select({
                ios: {
                    shadowColor: theme.color.specified.blue,
                    shadowOpacity: 0.5,
                    shadowRadius: deviceUI.moderateScale(3),
                    shadowOffset: {
                        height: 0,
                        width: 0,
                    },
                },
                android: {
                    shadowColor: theme.color.specified.blue,
                    elevation: 5,
                },
            }),
        },
        infoSection: {
            flex: 0.5,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingLeft: deviceUI.moderateScale(10),
        },
        badge: {
            width: deviceUI.moderateScale(50),
            height: deviceUI.moderateScale(25),
            borderRadius: deviceUI.moderateScale(20),
            backgroundColor: theme.color.specified.blue,
            justifyContent: "center",
            alignItems: "center",
        },
        expirationNotiSection: {
            flex: 0.4,
        },
        functionSection: {
            flex: 0.1,
        },
    });

    return {
        main,
        tenant,
    };
}
