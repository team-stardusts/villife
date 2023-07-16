import { StyleSheet } from "react-native";
import { useBottomEditModalStylesType } from "./type";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useBottomEditModalStyles(): useBottomEditModalStylesType {
    const { deviceUI, theme } = useStyler();
    return StyleSheet.create({
        bottomModalHeight: {
            height: deviceUI.getScreenSize().height * 0.3,
        },
        iconSize: { width: deviceUI.moderateScale(30) },
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
            borderRadius: deviceUI.moderateScale(10),
            ...theme.font.researved.h3,
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
    });
}
