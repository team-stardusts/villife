import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { UseNotiOutLinedBoxListStylesType } from "../outlined_box_list/type";
import { FontFamilies } from '../../../../../libs/themes/types';

export default function useNotiOutlinedBoxStyles(): UseNotiOutLinedBoxListStylesType {
    const { deviceUI, theme } = useStyler();


    // [TO-DO] : 색상도 양식에 맞게 변경 
    return StyleSheet.create({
        container: {
            borderWidth: deviceUI.moderateScale(2),
            borderColor: "#0B75F2",
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
            borderColor: "#0B75F2",
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
            width: deviceUI.getScreenSize().width * 0.8,
        },
    });
}
0;
