import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { RelplyInputStylesType } from "./type";

export default function useReplyInputStyle(): RelplyInputStylesType {
    const { deviceUI, theme } = useStyler();

    const Style = StyleSheet.create({
        replyInputContainer: {
            backgroundColor: theme.colorFamily.white,
        },
        replyImageSection: {
            borderTopColor: theme.colorFamily.blue,
            borderTopWidth: deviceUI.moderateScale(1),
            flexDirection: "row",
        },
        replyInputSection: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.colorFamily.white,
            borderColor: theme.colorFamily.blue,
            borderWidth: deviceUI.moderateScale(1),
        },
        image: {
            width: deviceUI.moderateScale(50),
            margin: deviceUI.moderateScale(7),
            borderRadius: deviceUI.moderateScale(8),
        },
        replyTextInput: {
            width: "75%",
            paddingLeft: deviceUI.moderateScale(10),
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
        replySubmitText: {
            color: theme.colorFamily.black,
            fontFamily: theme.font.fontFamilies.pretendard.regular,
            fontSize: deviceUI.moderateScale(10),
        },
        modifyCancleButton: {
            position: "absolute",
            top: -deviceUI.moderateScale(33),
            right: deviceUI.moderateScale(3),
            width: deviceUI.moderateScale(70),
            height: deviceUI.moderateScale(30),
            backgroundColor: theme.colorFamily.red,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: deviceUI.moderateScale(10),
        },
        modifyCancleButtonText: {
            fontFamily: theme.font.fontFamilies.pretendard.bold,
            color: theme.colorFamily.black,
        },
    });
    return Style;
}
