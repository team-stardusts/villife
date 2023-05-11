import { ComplaintInfo } from "../../services/type";
import { StyleSheet } from "react-native";

export type ComplaintEditorStylesType = ReturnType<typeof StyleSheet.create>;

export type ComplaintEditorProps = {
    titleRef: React.MutableRefObject<string>;
    contentRef: React.MutableRefObject<string>;
    mode: "register" | "modify";
};
