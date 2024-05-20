import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useNotiOutlinedBoxStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            marginBottom: deviceUI.moderateScale(16),
            borderRadius: deviceUI.moderateScale(15),
            width: deviceUI.getScreenSize().width * 0.9,
            borderColor: "rgba(0, 0, 0, 0)",
        },
        innerBox: {
            alignItems: "center",
            overflow: "visible",
        },
        innerTitleSection: {
            width: "90%",
            borderColor: theme.color.specified.lightgrey,
        },
        contentBox: {
            alignItems: "center",
            flexDirection: "row",
            minHeight: deviceUI.moderateScale(55),
        },
        titleTextBox: {
            width: "67%",
            paddingLeft: "5%",
            marginVertical: deviceUI.moderateScale(10),
        },
        absoluteWrapper: {
            position: "absolute",
            width: "100%",
            height: "100%",
            alignItems: "flex-end",
            justifyContent: "center",
        },
        iconBox: { flexDirection: "row" },
        editButton: {
            justifyContent: "center",
            marginRight: "2%",
        },
        foldedContainer: {
            marginVertical: deviceUI.moderateScale(25),
            width: deviceUI.getScreenSize().width * 0.8,
            //width: "100%",
            minHeight: 80,
            zIndex: 6,
        },
        titleText: {
            fontSize: deviceUI.moderateScale(16),
            fontFamily: theme.font.fontFamily.pretendard.bold,
            color: theme.color.specified.black,
        },
        titleTextSmall: {
            ...theme.font.researved.h3,
            fontSize: deviceUI.moderateScale(14.5),
            color: theme.color.specified.black,
        },
        subTitleText: {
            fontSize: deviceUI.moderateScale(10),
            fontFamily: theme.font.fontFamily.pretendard.regular,
            color: theme.color.specified.black,
        },
        vectorIcon: {
            width: deviceUI.moderateScale(50),
            color: theme.color.specified.grey,
        },
        editIcon: {
            width: deviceUI.moderateScale(40),
            color: theme.color.specified.grey,
        },
        indicator: {
            size: deviceUI.moderateScale(25),
            color: theme.color.status.info,
        },
    });
}
