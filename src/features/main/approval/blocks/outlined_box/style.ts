import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { ApprovalOutlinedBoxStylesType } from "./type";

export default function useApprovalOutlinedBoxStyle(): ApprovalOutlinedBoxStylesType {
    const { deviceUI, theme } = useStyler();

    const style = StyleSheet.create({
        container: {
            borderWidth: deviceUI.moderateScale(2),
            borderColor: "#0B75F2",
            marginVertical: deviceUI.getScreenSize().height * 0.008,
            borderRadius: deviceUI.moderateScale(15),
            minHeight: deviceUI.getScreenSize().height * 0.08,
            width: "100%",
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
        },
        titleTextBox: {
            marginLeft: "5%",
        },
        titleText: {
            fontSize: deviceUI.moderateScale(16),
            fontFamily: theme.font.fontFamilies.pretendard.bold,
            color: theme.colorFamily.black,
        },
        subText: {
            fontSize: deviceUI.moderateScale(12),
            fontFamily: theme.font.fontFamilies.pretendard.regular,
            color: theme.colorFamily.black,
        },
        subContainerBox: { flexDirection: "row", marginTop: "3%" },
        subInnerBox: { flexDirection: "row", justifyContent: "center", alignContent: "center", marginLeft: "2%" },
        absoluteWrapper: {
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "flex-end",
        },
        iconBuildingSize: {
            width: deviceUI.moderateScale(14),
        },
        iconUserSize: {
            width: deviceUI.moderateScale(16),
        },
        iconMoreSize: {
            width: deviceUI.moderateScale(30),
        },
    });
    return style;
}
