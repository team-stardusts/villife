import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { ComplaintRegisterButtonStylesType } from "./type";

export default function useComplaintRegisterButtonStyle(): ComplaintRegisterButtonStylesType {
    const { deviceUI, theme } = useStyler();

    const Style = StyleSheet.create({
        button: {
            backgroundColor: "white",
            height: "100%",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingRight: deviceUI.moderateScale(15),
        },
        text: {
            fontSize: deviceUI.moderateScale(14),
            fontFamily: theme.font.fontFamily.pretendard.bold,
            color: theme.color.specified.black,
        },
    });
    return Style;
}
