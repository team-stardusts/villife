import { StyleSheet } from "react-native";
import useStyler from "../../../../../../common/hooks/styler/hooks";

export default function useMFDataSetterStyles() {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        container: {
            //flex: 1,
        },
        wrapper: {},
        row: {
            flexDirection: "row",
            marginBottom: deviceUI.moderateScale(20),
            justifyContent: "space-between",
        },
        rowTitleWrapper: {
            marginLeft: deviceUI.moderateScale(10),
            justifyContent: "center",
        },
        rowTitle: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(15),
        },
        rowContentBox: {
            flexDirection: "row",
        },
        rowContentExplanation: {
            justifyContent: "center",
        },
        rowContentExplanationText: {
            color: theme.color.specified.grey,
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(12),
        },
    });

    const date = StyleSheet.create({
        setterWrapper: {
            //paddingVertical: deviceUI.moderateScale(10),
            marginLeft: deviceUI.moderateScale(10),
        },
        setterBtn: {
            flexDirection: "row",
        },
        setterDisplayBox: {
            width: deviceUI.moderateScale(70),
            height: deviceUI.moderateScale(30),
            borderRadius: deviceUI.moderateScale(10),
            borderWidth: 1,
            borderColor: theme.color.specified.lightblue,
            justifyContent: "center",
            alignItems: "center",
        },
        setterText: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(15),
        },
        setterIconWrapper: {
            justifyContent: "center",
            alignItems: "center",
            marginLeft: deviceUI.moderateScale(5),
        },
        setterIcon: {
            width: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
        },
    });

    const bank = StyleSheet.create({
        additionBtn: {
            padding: deviceUI.moderateScale(3),
        },
        additionIcon: {
            width: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
        },
    });

    return {
        main,
        date,
        bank,
    };
}
