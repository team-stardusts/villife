import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { UseNotiOutLinedBoxListStylesType } from "../outlined_box_list/type";

export default function useNotiOutlinedBoxStyles(): UseNotiOutLinedBoxListStylesType {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            borderWidth: deviceUI.moderateScale(2),
            borderColor: "#0B75F2",
            marginVertical: "1.5%",
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
            flexDirection: "row",
            alignItems: "center",
            height: deviceUI.getScreenSize().height * 0.08,
            borderBottomColor: "#0B75F2",
        },
        titleTextBox: {
            marginLeft: "5%",
        },
        absoluteWrapper: {
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "flex-end",
            flexDirection: "row",
        },

        editButton: {
            marginRight: "10%",
            alignItems: "center",
            justifyContent: "center",
        },
        iconEditSize: {
            width: deviceUI.moderateScale(20),
        },
        iconVectorSize: {
            width: deviceUI.moderateScale(30),
        },
        foldedContainer: {
            width: deviceUI.getScreenSize().width * 0.8,
        },
    });
}
