import { GestureResponderEvent, StyleSheet } from "react-native";

export default interface EditorProps {
    titleRef: React.MutableRefObject<string>;
    contentRef: React.MutableRefObject<string>;
    mode: "modify" | "register";
}
