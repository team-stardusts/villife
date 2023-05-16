import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { RelplyInputStylesType } from "./type";

export default function useReplyInputStyle(): RelplyInputStylesType {
    const { deviceUI, theme } = useStyler();

    const Style = StyleSheet.create({
        replyInputContainer: {
            backgroundColor: "white",
        },
        replyImageSection: {
            borderTopColor: theme.colorFamily.blue,
            borderTopWidth: deviceUI.moderateScale(1),
            flexDirection: "row",
        },
        replyInputSection: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            borderColor: theme.colorFamily.blue,
            borderWidth: deviceUI.moderateScale(1),
        },
        image: {
            width: deviceUI.moderateScale(50),
            margin: deviceUI.moderateScale(7),
            borderRadius: deviceUI.moderateScale(8),
        },
        replyTextInput: {
            minheight: deviceUI.moderateScale(10),
            width: "80%",
            fontFamily: theme.font.fontFamilies.pretendard.bold,
        },
        replyImageIconSize: {
            width: deviceUI.moderateScale(24),
        },
        imageIconBox: {
            height: deviceUI.moderateScale(30),
            width: deviceUI.moderateScale(40),
            justifyContent: "center",
            alignItems: "center",
        },
        verticalLine: {
            borderLeftColor: theme.colorFamily.blue,
            borderLeftWidth: deviceUI.moderateScale(1),
            height: "80%",
            width: deviceUI.moderateScale(1),
        },
    });
    return Style;
}
