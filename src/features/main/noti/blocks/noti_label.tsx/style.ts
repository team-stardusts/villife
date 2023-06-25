import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { UseNotiLabelStylesType } from "./type";

export default function useNotiLableStyles(): UseNotiLabelStylesType {
    const { deviceUI, theme } = useStyler();
    return StyleSheet.create({
        containerRed: {
            width: deviceUI.getScreenSize().width * 0.13,
            height: deviceUI.getScreenSize().height * 0.035,
            borderRadius: deviceUI.moderateScale(15),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colorFamily.red,
        },
        containerGreen: {
            width: deviceUI.getScreenSize().width * 0.13,
            height: deviceUI.getScreenSize().height * 0.035,
            borderRadius: deviceUI.moderateScale(15),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colorFamily.green,
        },
        containerGray: {
            width: deviceUI.getScreenSize().width * 0.13,
            height: deviceUI.getScreenSize().height * 0.035,
            borderRadius: deviceUI.moderateScale(15),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colorFamily.grey,
        },
        textStyle: {
            ...theme.font.researved.h4,
            color: "white",
        },
    });
}
