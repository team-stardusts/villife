import { StyleSheet } from "react-native";
import useStyler from "../../../hooks/styler/hooks";

export default function useNavigationViewBottomStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colorFamily.white,
            borderTopColor: theme.colorFamily.lightgrey,
            borderTopWidth: deviceUI.moderateScale(2),
        },
        wrapper: {
            width: "18%",
            alignItems: "center",
        },
        iconBox: {
            flex: 5,
            justifyContent: "flex-end",
            paddingBottom: deviceUI.horizontalScale(0.05),
        },
        icon: {
            width: deviceUI.moderateScale(50),
        },
        selected: {
            color: theme.colorFamily.black,
        },
        unselected: {
            color: theme.colorFamily.lightgrey,
        },
        captionBox: {
            flex: 5,
        },
        caption: {
            ...theme.font.researved.h5,
            fontSize: deviceUI.moderateScale(12),
        },
    });
}
