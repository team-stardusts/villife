import { StyleSheet } from "react-native";
import { UseNotiRegisterButtonStylesType } from "./type";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useNotiRegisterButtonStyles(): UseNotiRegisterButtonStylesType {
    const { deviceUI, theme } = useStyler();
    return StyleSheet.create({
        registerButton: {
            height: "100%",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingRight: deviceUI.moderateScale(15),
        },
        registerText: {
            ...theme.font.researved.h4,
            color: theme.colorFamily.black,
        },
    });
}
