import { GestureResponderEvent, StyleSheet } from "react-native";

export default interface NotiEditorProps {
    titleRef: React.MutableRefObject<string>;
    contentRef: React.MutableRefObject<string>;
    mode: "modify" | "register";
}

export type UseNotiEditorStylesType = ReturnType<typeof StyleSheet.create>;
