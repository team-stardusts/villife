import { StyleSheet } from "react-native";
import { UseNotiEditorStylesType } from "./type";

export default function useNotiEditorStyles(): UseNotiEditorStylesType {
    return StyleSheet.create({
        rich: {
            flex: 1,
        },
        richBar: {
            backgroundColor: "rgba(83, 156, 241,0.2)",
        },
        title: {
            fontSize: 30,
            marginLeft: "3%",
            fontFamily: "Pretendard-Bold",
        },
        contentStyle: {
            backgroundColor: "white",
            height: "100%",
            color: "black",
            caretColor: "red",
            placeholderColor: "gray",

            // cssText: '#editor {background-color: #f3f3f3}', // initial valid
            contentCSSText: "font-size: 16px; min-height: 200px;", // initial valid
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
