import { StyleSheet } from "react-native";
import { useBottomEditModalStylesType } from "./type";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useBottomEditModalStyles(): useBottomEditModalStylesType {
    const { deviceUI, theme } = useStyler();
    return StyleSheet.create({
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
            fontFamily: theme.font.fontFamilies.pretendard.bold,
            fontSize: deviceUI.moderateScale(14),
            marginLeft: deviceUI.moderateScale(8),
            color: theme.colorFamily.black,
        },
    });
}
