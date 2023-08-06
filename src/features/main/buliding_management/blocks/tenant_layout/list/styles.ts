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
            height: deviceUI.moderateScale(60),
            marginBottom: deviceUI.moderateScale(15),
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
        badgeSection: {
            flex: 0.2,
        },
        roomNumberSection: {
            flex: 0.2,
        },
        contractSection: {
            flex: 0.2,
        },
    });

    return {
        main,
        tenant,
    };
}
