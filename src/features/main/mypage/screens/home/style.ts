import { StyleSheet } from "react-native";
import { UseMyPageHomeScreenStylesType } from "./type";

export default function useMyPageHomeScreenStyles(): UseMyPageHomeScreenStylesType {
    return StyleSheet.create({
        contentsWrapper: {
            flex: 1,
        },
    });
}
