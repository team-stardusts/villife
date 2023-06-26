import { StyleSheet } from "react-native";

export type ContentPriority = number;
// @description 1: red , 2: green , 3: grey

export type ContentLableProps = {
    priority: ContentPriority;
};

export type UseNotiLabelStylesType = ReturnType<typeof StyleSheet.create>;
