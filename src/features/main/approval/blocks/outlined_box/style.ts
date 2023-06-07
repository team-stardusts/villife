import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { ApprovalOutlinedBoxStylesType } from "./type";

export default function useApprovalOutlinedBoxStyle(): ApprovalOutlinedBoxStylesType {
    const { deviceUI, theme } = useStyler();

    const style = StyleSheet.create({
        container: {
            borderWidth: 2,
            borderColor: "#0B75F2",
            marginVertical: "1.5%",
            borderRadius: 15,
        },
        innerBox: {
            alignItems: "center",
            overflow: "visible",
        },
        innerTitleSection: {
            width: "90%",
            flexDirection: "row",
            alignItems: "center",
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
        },
        editButtonContainer: {
            position: "absolute",
            zIndex: 10,
            right: "5%",
        },
        editButton: {
            backgroundColor: "#DAEAFD",
            flexDirection: "row",
            alignItems: "center",
            padding: 3,
            borderRadius: 10,
        },
        editModalContentContainer: {
            marginTop: "5%",
            width: "100%",
        },
        editModalMenu: {
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: "10%",
            paddingBottom: "5%",
        },
        editModalMenuText: {
            marginLeft: 15,
            color: "black",
        },
        iconSize: {
            width: deviceUI.moderateScale(14),
        },
    });
    return style;
}
