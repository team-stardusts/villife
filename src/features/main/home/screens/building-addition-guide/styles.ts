import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useBuildingAdditionGuideScreenStyles() {
    const { theme, deviceUI } = useStyler();

    return StyleSheet.create({
        nav: {
            backgroundColor: theme.color.specified.white,
        },
        container: {
            flex: 1,
            alignItems: "center",
            paddingTop: deviceUI.moderateScale(10),
        },
        animationBox: {
            marginTop: deviceUI.moderateScale(7),
            justifyContent: "center",
            alignItems: "center",
        },
        arrowBox: {
            marginBottom: deviceUI.moderateScale(10),
        },
        iconArrow: {
            width: deviceUI.moderateScale(55),
            color: theme.color.specified.blue,
        },
        iconVillifeBox: {
            marginTop: deviceUI.moderateScale(25),
            alignItems: "center",
        },
        iconVillife: {
            width: deviceUI.moderateScale(80),
            color: theme.color.specified.blue,
        },
        txtBox: {
            marginTop: deviceUI.moderateScale(120),
            alignItems: "center",
        },
        txtLine: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(20),
            color: theme.color.specified.black,
        },
        txtLineSmall: {
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(17),
            color: theme.color.specified.black,
        },
        txtHighlight: {
            color: theme.color.specified.blue,
        },
    });
}
