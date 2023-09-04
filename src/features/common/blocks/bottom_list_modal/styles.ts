import { StyleSheet } from "react-native";
import useStyler from "../../hooks/styler/hooks";

export default function useListBottomSlidableModalStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
            marginTop: deviceUI.moderateScale(10),
        },
        row: {
            width: "100%",
            height: deviceUI.moderateScale(50),
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: deviceUI.moderateScale(30),
            marginBottom: deviceUI.moderateScale(5),
        },
        iconBox: {
            justifyContent: "center",
            alignItems: "center",
            marginRight: deviceUI.moderateScale(15),
        },
        icon: {
            width: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
        },
        trashCanIcon: {
            width: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
        },
        textBox: {
            justifyContent: "center",
            width: "100%",
        },
        text: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.black,
        },
    });
}
