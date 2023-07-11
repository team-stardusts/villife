import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { ComplaintEditorStylesType } from "./types";
import RemoteCSS from "../../../../../libs/themes/remote_css";

export default function useComplaintEditorStyle(): ComplaintEditorStylesType {
    const { deviceUI, theme } = useStyler();

    const Style = StyleSheet.create({
        rich: {
            flex: 1,
            fontFamily: "Pretendard-Bold",
        },
        richBar: {
            backgroundColor: "rgba(83, 156, 241,0.2)",
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
