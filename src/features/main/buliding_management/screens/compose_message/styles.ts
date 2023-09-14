import { StyleSheet } from "react-native";
import { UseComposeMessageScreenStylesType } from "./type";

export default function useComposeMessageScreenStyles(): UseComposeMessageScreenStylesType {
    return StyleSheet.create({
        contentsWrapper: {
            flex: 1,
        },
    });
}
