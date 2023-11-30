import { StyleSheet } from "react-native";
import useStyler from "../../hooks/styler/hooks";

export default function useInfoPannelStyles() {
    const { deviceUI, theme } = useStyler();

    const infoHeight = deviceUI.getScreenSize().height * 0.06;

    return StyleSheet.create({
        container: {
            height: infoHeight,
            //width: "100%",
            backgroundColor: theme.color.series.blue.level1,
            borderRadius: deviceUI.moderateScale(15),
            marginVertical: deviceUI.moderateScale(5),
        },
        wrapper: {
            height: infoHeight,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingHorizontal: deviceUI.moderateScale(10),
        },
        iconBox: {
            height: infoHeight * 0.55,
            width: infoHeight * 0.55,
            borderRadius: infoHeight * 0.55,
            backgroundColor: theme.color.specified.blue,
            justifyContent: "center",
            alignItems: "center",
            transform: [
                {
                    rotateZ: "180deg",
                },
            ],
        },
        icon: {
            width: infoHeight * 0.85,
            color: theme.color.specified.white,
        },
        messageBox: {
            paddingLeft: deviceUI.moderateScale(10),
            paddingRight: deviceUI.moderateScale(5),
        },
        message: {
            maxWidth: "95%",
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(14),
            color: theme.color.specified.black,
        },
        info: {
            color: theme.color.status.primary,
        },
        warning: {
            color: theme.color.status.warning,
        },
        danger: {
            color: theme.color.status.danger,
        },
    });
}
