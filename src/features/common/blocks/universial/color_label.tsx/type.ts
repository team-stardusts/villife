import { ColorValue, StyleSheet } from "react-native";

export type ContentLableProps = {
    text: string;
    backgroundColor: ColorValue;
    textColor: ColorValue;
};

export type UseColorLableStylesType = ReturnType<typeof StyleSheet.create>;
