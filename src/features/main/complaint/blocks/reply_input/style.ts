import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import useOnKeyboardEvent from "../../../../common/hooks/keyboard";
import { useState } from "react";

export default function useReplyInputStyle() {
    const { deviceUI, theme, safetyEdgeSize } = useStyler();
    const [isKeyboardFold, setIsKeyboardFold] = useState<boolean>();
    const keyboardHeight = useOnKeyboardEvent({
        onShow: () => setIsKeyboardFold(false),
        onHide: () => setIsKeyboardFold(true),
    });

    const styles = StyleSheet.create({
        replyInputContainer: {
            ...deviceUI.select({
                android: {
                    bottom: 0,
                },
                ios: {
                    bottom: isKeyboardFold ? 0 : keyboardHeight - safetyEdgeSize.bottom,
                },
            }),
            backgroundColor: theme.color.specified.white,
        },
        replyImageSection: {
            borderTopColor: theme.color.specified.blue,
            borderTopWidth: deviceUI.moderateScale(1),
            flexDirection: "row",
        },
        replyInputSection: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.color.specified.white,
            borderColor: theme.color.specified.blue,
            borderTopWidth: deviceUI.moderateScale(1),
            borderBottomWidth: deviceUI.moderateScale(1),
        },
        replyInputVoidSpace: {
            position: "absolute",
            width: "100%",
            height: deviceUI.getScreenSize().height * 0.3,
            bottom: deviceUI.getScreenSize().height * -0.3,
            backgroundColor: theme.color.specified.blue,
        },
        image: {
            width: deviceUI.moderateScale(50),
            margin: deviceUI.moderateScale(7),
            borderRadius: deviceUI.moderateScale(8),
        },
        replyTextInput: {
            width: "75%",
            paddingLeft: deviceUI.moderateScale(10),
            fontFamily: theme.font.fontFamily.pretendard.bold,
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
            borderLeftColor: theme.color.specified.blue,
            borderLeftWidth: deviceUI.moderateScale(1),
            height: "80%",
            width: deviceUI.moderateScale(1),
        },
        replySubmitText: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(10),
        },
        modifyCancleButton: {
            position: "absolute",
            top: -deviceUI.moderateScale(33),
            right: deviceUI.moderateScale(3),
            width: deviceUI.moderateScale(70),
            height: deviceUI.moderateScale(30),
            backgroundColor: theme.color.specified.red,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: deviceUI.moderateScale(10),
        },
        modifyCancleButtonText: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            color: theme.color.specified.black,
        },
    });
    return styles;
}
