import { StyleSheet } from "react-native";
import useStyler from "../../../../../../common/hooks/styler/hooks";

export default function MFHistoryCardViewStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            width: "100%",
            marginBottom: deviceUI.moderateScale(15),
        },
        pressable: {
            width: "100%",
            backgroundColor: theme.color.specified.white,
            paddingVertical: deviceUI.moderateScale(15),
            paddingHorizontal: deviceUI.moderateScale(20),
            borderRadius: deviceUI.moderateScale(10),
        },
        row: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: deviceUI.moderateScale(5),
        },
        set: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        roomNumber: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(20),
            color: theme.color.specified.black,
        },
        key: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.black,
        },
        value: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.black,
        },
        notimarkCircle: {
            width: deviceUI.moderateScale(17),
            height: deviceUI.moderateScale(17),
            borderRadius: deviceUI.moderateScale(17),
            backgroundColor: theme.color.specified.white,
            borderColor: theme.color.specified.red,
            borderWidth: deviceUI.moderateScale(1),
            justifyContent: "center",
            alignItems: "center",
            marginLeft: deviceUI.moderateScale(7),
        },
        notimark: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(10),
            color: theme.color.specified.red,
        },
    });
}
