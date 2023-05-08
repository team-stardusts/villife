import { GestureResponderEvent, StyleSheet } from "react-native";

export default interface NotiEditorProps {
    titleRef: React.MutableRefObject<string>;
    contentRef: React.MutableRefObject<string>;
}

export type UseNotiEditorStylesType = ReturnType<typeof StyleSheet.create>;
