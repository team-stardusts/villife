import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { UseNotiLabelStylesType } from "./type";

export default function useNotiLableStyles(): UseNotiLabelStylesType {
    const { deviceUI, theme } = useStyler();
    return StyleSheet.create({
        containerRed: {
            width: deviceUI.getScreenSize().width * 0.15,
            height: deviceUI.getScreenSize().height * 0.05,
            borderRadius: deviceUI.moderateScale(10),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red",
        },
        containerGreen: {
            width: deviceUI.getScreenSize().width * 0.15,
            height: deviceUI.getScreenSize().height * 0.5,
            borderRadius: deviceUI.moderateScale(10),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "green",
        },
        containerGray: {
            width: deviceUI.getScreenSize().width * 0.15,
            height: deviceUI.getScreenSize().height * 0.5,
            borderRadius: deviceUI.moderateScale(10),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#7C7C7C",
        }, 
        textStyle: {
            ...theme.font.researved.h4,
            color: "white",
        },
    });
}
