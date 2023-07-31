import { StyleSheet } from "react-native";
import useStyler from "../../../../../common/hooks/styler/hooks";

export default function useVehicleListStyles() {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        container: {
            minHeight: deviceUI.getScreenSize().height * 0.4,
        },
        contentBox: {
            backgroundColor: theme.color.specified.white,
        },
        wrapper: {
            width: "100%",
            height: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingHorizontal: deviceUI.moderateScale(20),
            paddingTop: deviceUI.moderateScale(15),
        },
        headerContainer: {
            width: "100%",
            height: deviceUI.moderateScale(100),
        },
        bodyContainer: {
            width: "100%",
        },
    });

    const header = StyleSheet.create({
        container: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "flex-start",
            borderBottomWidth: deviceUI.moderateScale(5),
            borderColor: theme.color.series.grey.level1,
        },
        titleBox: {
            height: "60%",
            justifyContent: "center",
        },
        title: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(30),
        },
        modifyBox: {
            height: "40%",
            width: "100%",
            justifyContent: "space-between",
            paddingHorizontal: deviceUI.moderateScale(5),
            marginBottom: deviceUI.moderateScale(10),
            flexDirection: "row",
        },
        modifyBtn: {
            width: "40%",
            height: "80%",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: deviceUI.moderateScale(10),
            backgroundColor: theme.color.series.grey.level1,
            borderRadius: deviceUI.moderateScale(10),
        },
        modifyBtnTitle: {
            ...theme.font.researved.h4,
        },
    });

    const body = StyleSheet.create({
        container: {
            width: "100%",
            paddingTop: deviceUI.moderateScale(5),
            paddingBottom: deviceUI.moderateScale(20),
        },
        vehicleInfoContainer: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
        },
        vehicleInfoBox: {
            width: "55%",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginVertical: deviceUI.moderateScale(15),
        },
        tenantBadge: {
            width: deviceUI.moderateScale(16),
            color: theme.color.specified.white,
            backgroundColor: theme.color.specified.grey,
        },
        guestBadge: {
            width: deviceUI.moderateScale(16),
            color: theme.color.specified.black,
            backgroundColor: theme.color.specified.green,
        },
        plateNumber: {
            marginLeft: deviceUI.moderateScale(10),
            color: theme.color.specified.black,
            fontWeight: "bold",
            ...theme.font.researved.h4,
        },
        communicationFuncContainer: {
            flexDirection: "row",
            justifyContent: "flex-start",
        },
        communicationIconBox: {
            marginRight: deviceUI.moderateScale(12),
        },
        phoneIcon: {
            width: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
        },
        letterIcon: {
            width: deviceUI.moderateScale(50),
            color: theme.color.specified.black,
        },
        detailFuncContainer: {
            position: "absolute",
            right: deviceUI.moderateScale(3),
            justifyContent: "flex-end",
        },
        detailIconBox: {
            //backgroundColor: "teal",
        },
        detailIcon: {
            width: deviceUI.moderateScale(50),
            color: theme.color.specified.black,
        },
    });

    return {
        main,
        header,
        body,
    };
}
