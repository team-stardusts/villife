import { StyleSheet } from "react-native";
import { useNotiModifyButtonStylesType } from "./type";

export default function useNotiModifyButtonStyles(): useNotiModifyButtonStylesType {
    return StyleSheet.create({
        ModifyButton: {
            backgroundColor: "tomato",
            height: "100%",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingRight: 15,
        },
    });
}
