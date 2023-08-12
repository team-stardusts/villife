import { Platform, StyleSheet } from "react-native";
import useStyler from "../../../../../common/hooks/styler/hooks";

export default function useBuildingTenantMatrixViewStyles() {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: deviceUI.moderateScale(3),
        },
    });

    const floor = StyleSheet.create({
        container: {
            height: deviceUI.moderateScale(70),
            marginVertical: deviceUI.moderateScale(10),
        },
        tenantBox: {
            height: deviceUI.moderateScale(62),
            marginVertical: deviceUI.moderateScale(5),
            width: deviceUI.moderateScale(80),
            marginHorizontal: deviceUI.moderateScale(10),
            borderRadius: deviceUI.moderateScale(10),
            backgroundColor: theme.color.specified.white,
            justifyContent: "center",
            alignItems: "center",
            ...Platform.select({
                ios: {
                    shadowOpacity: 0.5,
                    shadowRadius: deviceUI.moderateScale(3),
                    shadowOffset: {
                        height: 0,
                        width: 0,
                    },
                },
                android: {
                    elevation: 5,
                },
            }),
        },
        emptyStatus: {
            shadowColor: theme.color.series.grey.level6,
        },
        signedStatus: {
            shadowColor: theme.color.status.primary,
        },
        unsignedStatus: {
            shadowColor: theme.color.status.danger,
        },
        text: {
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.black,
        },
        checkIconWrapper: {
            position: "absolute",
            top: 0,
            right: 0,
            width: deviceUI.moderateScale(20),
            height: deviceUI.moderateScale(20),
            justifyContent: "center",
            alignItems: "center",
        },
        checkIcon: {
            width: deviceUI.moderateScale(20),
            color: theme.color.status.secondary,
        },
        checkedCheckIcon: {
            width: deviceUI.moderateScale(22),
            color: theme.color.status.primary,
        },
    });

    return {
        main,
        floor,
    };
}
