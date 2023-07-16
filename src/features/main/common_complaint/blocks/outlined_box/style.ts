import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { UseNotiOutLinedBoxListStylesType } from "../outlined_box_list/type";

export default function useNotiOutlinedBoxStyles(): UseNotiOutLinedBoxListStylesType {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            borderWidth: deviceUI.moderateScale(2),
            borderColor: theme.colorFamily.blue,
            marginVertical: deviceUI.getScreenSize().height * 0.008,
            borderRadius: deviceUI.moderateScale(15),
            minHeight: deviceUI.getScreenSize().height * 0.08,
            width: deviceUI.getScreenSize().width * 0.9,
        },
        innerBox: {
            alignItems: "center",
            overflow: "visible",
        },
        innerTitleSection: {
            width: "90%",
            borderColor: theme.colorFamily.blue,
        },
        contentBox: {
            alignItems: "center",
            flexDirection: "row",
            height: deviceUI.getScreenSize().height * 0.08,
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
            width: deviceUI.moderateScale(20),
        },
        iconVectorSize: {
            width: deviceUI.moderateScale(30),
        },
        foldedContainer: {
            marginVertical: deviceUI.moderateScale(25),
            width: deviceUI.getScreenSize().width * 0.8,
        },
        titleText: {
            ...theme.font.researved.h3,
            color: theme.colorFamily.black,
        },
        subTitleText: {
            ...theme.font.researved.h5,
            color: theme.colorFamily.black,
        },
    });
}
