import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useParkingHomeScreenStyles() {
    const { deviceUI, theme } = useStyler();

    const screen = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.color.series.grey.level1,
        },
        myVehicleCardViewBox: {
            height: "45%",
            width: "100%",
            paddingBottom: deviceUI.moderateScale(10),
        },
        buildingVehiclesViewBox: {
            minHeight: "50%",
            width: "100%",
        },
        contentTitle: {
            ...theme.font.researved.h2,
            marginBottom: deviceUI.moderateScale(10),
        },
        contentTitleBox: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        contentFuncButtonBox: {
            width: "30%",
            height: "100%",
        },
        contentFuncButtonIcon: {
            width: deviceUI.moderateScale(35),
        },
    });

    const vehicleInfo = StyleSheet.create({
        container: {
            height: deviceUI.moderateScale(60),
        },
        contentBox: {
            flex: 1,
            flexDirection: "row",
            paddingHorizontal: deviceUI.moderateScale(10),
        },
        vehicleInfoBox: {
            flex: 5.4,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
        },
        tenantBadge: {
            width: deviceUI.moderateScale(13),
            color: theme.color.specified.white,
            backgroundColor: theme.color.specified.grey,
        },
        guestBadge: {
            width: deviceUI.moderateScale(13),
            color: theme.color.specified.black,
            backgroundColor: theme.color.specified.green,
        },
        plateNumber: {
            marginLeft: deviceUI.moderateScale(10),
            color: theme.color.specified.white,
            fontWeight: "bold",
            ...theme.font.researved.h4,
        },
        communicationFuncBox: {
            flex: 2.4,
            flexDirection: "row",
            justifyContent: "flex-start",
        },
        communicationIconBox: {
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: deviceUI.moderateScale(5),
        },
        phoneIcon: {
            width: deviceUI.moderateScale(40),
            color: theme.color.specified.green,
        },
        letterIcon: {
            width: deviceUI.moderateScale(50),
            color: theme.color.specified.white,
        },
        infoBox: {
            flex: 3,
            justifyContent: "center",
            alignItems: "flex-end",
        },
        moreIconBox: {},
        moreIcon: {
            width: deviceUI.moderateScale(50),
            color: theme.color.specified.white,
        },
    });

    return {
        screen,
        vehicleInfo,
    };
}
