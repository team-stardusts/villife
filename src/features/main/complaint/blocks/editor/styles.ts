import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import RemoteCSS from "../../../../../libs/themes/remote_css";
import useOnKeyboardEvent from "../../../../common/hooks/keyboard";
import { useState } from "react";

export default function useComplaintEditorStyle() {
    const { deviceUI, theme, safetyEdgeSize } = useStyler();
    const [isKeyboardFold, setIsKeyboardFold] = useState<boolean>();
    const keyboardHeight = useOnKeyboardEvent({
        onShow: () => setIsKeyboardFold(false),
        onHide: () => setIsKeyboardFold(true),
    });

    const Style = StyleSheet.create({
        rich: {
            flex: 1,
        },
        richBar: {
            height: deviceUI.moderateScale(60),
            backgroundColor: "rgba(83, 156, 241,0.2)",
            bottom: isKeyboardFold ? 0 : keyboardHeight - safetyEdgeSize.bottom,
            width: deviceUI.getScreenSize().width,
            position: "absolute",
        },
        title: {
            fontSize: deviceUI.moderateScale(30),
            marginLeft: "3%",
            fontFamily: "Pretendard-Bold",
        },
        scroll: { flex: 1 },
        tib: {
            textAlign: "center",
            color: "#515156",
        },
        flatStyle: {
            paddingHorizontal: 12,
            fontFamily: "Pretendard-Bold",
        },
    });
    return Style;
}

const fontFamily = "Pretendard-Bold";

export const EditorStyle = {
    initialCSSText: `${RemoteCSS.getPretendardBold()}`,
    backgroundColor: "white",
    color: "black",
    caretColor: "red",
    placeholderColor: "grey",
    contentCSSText: `font-family:${fontFamily}`,
};
