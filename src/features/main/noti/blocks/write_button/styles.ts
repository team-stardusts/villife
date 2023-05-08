import { StyleSheet } from "react-native";
import { UseNotiWriteButtonStylesType } from "./type";

export default function useNotiWriteButtonStyles(): UseNotiWriteButtonStylesType {
    return StyleSheet.create({
        WriteButton: {
            height: "100%",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingRight: 15,
        },
    });
}
