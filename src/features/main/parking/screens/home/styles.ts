import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useParkingHomeScreenStyles() {
    const { deviceUI, theme } = useStyler();

    const screen = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colorFamily.white,
        },
        myVehicleCardViewBox: {
            flex: 3.5,
            paddingBottom: deviceUI.moderateScale(10),
        },
        buildingVehiclesViewBox: {
            flex: 6.5,
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
            color: theme.colorFamily.white,
            backgroundColor: theme.colorFamily.grey,
        },
        guestBadge: {
            width: deviceUI.moderateScale(13),
            color: theme.colorFamily.black,
            backgroundColor: theme.colorFamily.green,
        },
        plateNumber: {
            marginLeft: deviceUI.moderateScale(10),
            color: theme.colorFamily.white,
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
            color: theme.colorFamily.green,
        },
        letterIcon: {
            width: deviceUI.moderateScale(50),
            color: theme.colorFamily.white,
        },
        infoBox: {
            flex: 3,
        },
    });

    return {
        screen,
        vehicleInfo,
    };
}
