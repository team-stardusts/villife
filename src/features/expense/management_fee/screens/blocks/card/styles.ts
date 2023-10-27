import { StyleSheet } from "react-native";
import useStyler from "../../../../../common/hooks/styler/hooks";
import { MFHistoryCardViewProps } from "./types";

export default function useMFHistoryCardViewStyles(
    ischecked: boolean | null,
    checkmode: MFHistoryCardViewProps["checkmode"]
) {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            width: "100%",
            marginBottom: deviceUI.moderateScale(15),
        },
        pressable: {
            width: "100%",
            backgroundColor: theme.color.specified.white,
            opacity: checkmode?.disabled ? 0.5 : 1,
            paddingVertical: deviceUI.moderateScale(15),
            paddingHorizontal: deviceUI.moderateScale(20),
            borderRadius: deviceUI.moderateScale(10),
        },
        checkIndicator: {
            position: "absolute",
            right: -deviceUI.moderateScale(5),
            top: -deviceUI.moderateScale(5),
            justifyContent: "center",
            alignItems: "center",
            borderWidth: ischecked ? 0 : deviceUI.moderateScale(2),
            width: deviceUI.moderateScale(17),
            height: deviceUI.moderateScale(17),
            borderRadius: deviceUI.moderateScale(17),
            borderColor: theme.color.specified.black,
            backgroundColor: ischecked ? theme.color.specified.blue : theme.color.specified.white,
        },
        checkIcon: {
            width: deviceUI.moderateScale(18),
            color: theme.color.specified.white,
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
        rowKey: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.black,
            width: deviceUI.moderateScale(70),
            letterSpacing: deviceUI.moderateScale(3),
        },
        rowValue: {
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
            //marginLeft: deviceUI.moderateScale(7),
        },
        notimark: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(10),
            color: theme.color.specified.red,
        },
    });
}
