import { StyleSheet } from "react-native";

export type ContentLableProps = {
    text: string;
    backgroundColor: string;
    textColor: string;
};

export type UseColorLableStylesType = ReturnType<typeof StyleSheet.create>;
