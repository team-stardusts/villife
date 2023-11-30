import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useTenantSettingScreenStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        nav: {
            backgroundColor: theme.color.specified.white,
        },
        container: {
            flex: 1,
            marginTop: deviceUI.moderateScale(10),
        },
        wrapper: {},
        row: {
            width: "100%",
            height: deviceUI.moderateScale(38),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: deviceUI.moderateScale(15),
            marginVertical: deviceUI.moderateScale(17),
        },
        col: {
            width: "100%",
            paddingHorizontal: deviceUI.moderateScale(15),
            marginTop: deviceUI.moderateScale(20),
        },
        lastElement: {
            marginBottom: deviceUI.moderateScale(20),
        },
        rowTitleBox: {
            height: "100%",
            justifyContent: "center",
        },
        title: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(17),
            color: theme.color.specified.blue,
        },
        colTitleBox: {
            width: "100%",
        },
        contractSettingBox: {
            height: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
        },
        contractTextBox: {
            width: "50%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderColor: theme.color.specified.blue,
            borderWidth: 1,
            borderRadius: deviceUI.moderateScale(10),
        },
        contractText: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(14),
            color: theme.color.specified.black,
        },
        arrowDownIconBox: {
            justifyContent: "center",
            paddingHorizontal: deviceUI.moderateScale(5),
        },
        arrowDownIcon: {
            width: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
        },
        moneyInputBox: {
            height: "100%",
            width: "60%",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
        },
        moneyInputLowLight: {
            color: theme.color.specified.blue,
        },
        moneyInputPostFixBox: {
            marginLeft: deviceUI.moderateScale(5),
        },
        moneyInputPostFix: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(13),
            color: theme.color.specified.black,
        },
        contractDateRangeBox: {
            width: "100%",
            height: deviceUI.moderateScale(30),
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: deviceUI.moderateScale(7),
        },
        contractDateRangeInput: {
            height: "100%",
            width: "45%",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: deviceUI.moderateScale(1),
            borderRadius: deviceUI.moderateScale(10),
            borderColor: theme.color.specified.blue,
            paddingHorizontal: deviceUI.moderateScale(10),
        },
        contractDateRangeInputText: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(13),
            color: theme.color.specified.black,
        },
        contractDateRangeSeparator: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(13),
            color: theme.color.specified.black,
            marginHorizontal: deviceUI.moderateScale(10),
        },
        tenantInfoInputBox: {
            height: deviceUI.moderateScale(35),
            marginTop: deviceUI.moderateScale(10),
            marginBottom: deviceUI.moderateScale(5),
        },
    });
}
