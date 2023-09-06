import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { UseNotiOutLinedBoxListStylesType } from "../outlined_box_list/type";

export default function useNotiOutlinedBoxStyles(): UseNotiOutLinedBoxListStylesType {
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
            height: deviceUI.moderateScale(50),
        },
        titleTextBox: {
            marginLeft: "5%",
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
        iconEditSize: {
            width: deviceUI.moderateScale(40),
        },
        iconVectorSize: {
            width: deviceUI.moderateScale(30),
        },
        foldedContainer: {
            marginVertical: deviceUI.moderateScale(25),
            width: deviceUI.getScreenSize().width * 0.8,
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
    });
}
