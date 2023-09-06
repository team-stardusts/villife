import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { UseNotiLabelStylesType } from "./type";

export default function useNotiLableStyles(): UseNotiLabelStylesType {
    const { deviceUI, theme } = useStyler();
    return StyleSheet.create({
        containerRed: {
            width: deviceUI.moderateScale(52),
            height: deviceUI.moderateScale(20),
            borderRadius: deviceUI.moderateScale(15),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.color.specified.lightblue,
        },
        containerGreen: {
            width: deviceUI.moderateScale(52),
            height: deviceUI.moderateScale(20),
            borderRadius: deviceUI.moderateScale(15),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.color.specified.green,
        },
        containerGray: {
            width: deviceUI.moderateScale(52),
            height: deviceUI.moderateScale(20),
            borderRadius: deviceUI.moderateScale(15),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.color.specified.grey,
        },
        textStyle: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(14),
            color: "white",
        },
    });
}
