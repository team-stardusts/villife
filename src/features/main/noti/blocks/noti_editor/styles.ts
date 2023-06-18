import { StyleSheet } from "react-native";
import { UseNotiEditorStylesType } from "./type";
import useStyler from "../../../../common/hooks/styler/hooks";
import RemoteCSS from "../../../../../libs/themes/remote_css";

export default function useNotiEditorStyles(): UseNotiEditorStylesType {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        rich: {
            flex: 1,
        },
        richBar: {
            backgroundColor: "rgba(83, 156, 241,0.2)",
        },
        title: {
            fontSize: deviceUI.moderateScale(30),
            marginLeft: deviceUI.moderateScale(10),
            fontFamily: "Pretendard-Bold",
        },
        scroll: { flex: 1 },
        tib: {
            textAlign: "center",
            color: "#515156",
        },
        flatStyle: {
            paddingHorizontal: 12,
        },
    });
}

export const EditorStyle = {
    initialCSSText: `${RemoteCSS.getPretendardBold()}`,
    backgroundColor: "white",
    color: "black",
    caretColor: "red",
    placeholderColor: "grey",
    contentCSSText: "font-size: 16px; min-height: 200px;",
};
