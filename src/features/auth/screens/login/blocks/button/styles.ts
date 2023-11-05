import { StyleSheet } from "react-native";
import useStyler from "../../../../../common/hooks/styler/hooks";
import { HostType } from "../../../../../../libs/rest_apis/villife/auth/types";

export default function useLoginButtonStyles(provider: HostType) {
    const { deviceUI, theme } = useStyler();

    let iconColor;
    let textColor;
    let backgroundColor;

    switch (provider) {
        case "apple":
            textColor = theme.color.specified.white;
            iconColor = theme.color.specified.white;
            backgroundColor = theme.color.specified.black;
            break;
        case "naver":
            textColor = theme.color.specified.white;
            iconColor = theme.color.specified.white;
            backgroundColor = "#03c75a";
            break;
        default:
            textColor = theme.color.specified.white;
            iconColor = theme.color.specified.white;
            backgroundColor = theme.color.specified.blue;
    }

    return StyleSheet.create({
        container: {
            width: "100%",
            height: "100%",
            borderRadius: deviceUI.moderateScale(10),
            backgroundColor: backgroundColor,
            justifyContent: "center",
            alignItems: "center",
        },
        iconWrapper: {
            height: "100%",
            width: "20%",
            position: "absolute",
            left: 0,
            justifyContent: "center",
            alignItems: "center",
        },
        icon: {
            width: deviceUI.moderateScale(40),
            color: iconColor,
        },
        btnTxt: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(15),
            color: textColor,
        },
    });
}
