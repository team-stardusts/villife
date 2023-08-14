import { Platform, StyleSheet } from "react-native";
import useStyler from "../../../../../common/hooks/styler/hooks";

export default function useBuildingTenantListViewStyles() {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: deviceUI.moderateScale(20),
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
        elementWrapper: {
            marginLeft: deviceUI.moderateScale(10),
            justifyContent: "center",
            alignItems: "center",
        },
        roomNumber: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(15),
        },
        contractType: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(15),
        },
        expirationNotiSection: {
            flex: 0.3,
            justifyContent: "center",
            alignItems: "flex-end",
        },
        expirationNoti: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(14),
        },
        expiration: {
            color: theme.color.status.danger,
        },
        imminentExpiration: {
            color: theme.color.status.warning,
        },
        functionSection: {
            flex: 0.2,
            justifyContent: "center",
            alignItems: "center",
        },
        checkRadio: {
            width: deviceUI.moderateScale(20),
            height: deviceUI.moderateScale(20),
            borderRadius: deviceUI.moderateScale(20),
            borderWidth: deviceUI.moderateScale(2),
            borderColor: theme.color.specified.black,
            justifyContent: "center",
            alignItems: "center",
        },
        disabledCheckRadio: {
            borderColor: theme.color.specified.lightgrey,
        },
        checkRadioIcon: {
            width: deviceUI.moderateScale(20),
            color: theme.color.specified.white,
        },
        checkedCheckRadio: {
            borderWidth: 0,
            backgroundColor: theme.color.status.primary,
        },
        detailBtnWrapper: {
            justifyContent: "center",
            alignItems: "center",
        },
        detailIcon: {
            width: deviceUI.moderateScale(50),
            color: theme.color.specified.black,
        },
    });

    return {
        main,
        tenant,
    };
}
