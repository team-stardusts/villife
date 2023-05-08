import { StyleSheet } from "react-native";
import { UseNotiRegisterButtonStylesType } from "./type";

export default function useNotiRegisterButtonStyles(): UseNotiRegisterButtonStylesType {
    return StyleSheet.create({
        RegisterButton: {
            backgroundColor: "tomato",
            height: "100%",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingRight: 15,
        },
    });
}
