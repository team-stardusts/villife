import { StyleSheet } from "react-native";
import { UseNoticeHomeScreenStylesType } from "./type";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useNoticeHomeScreenStyles() {
    const { deviceUI, theme } = useStyler();
    return StyleSheet.create({
        navContainer: {
            backgroundColor: theme.color.specified.white,
        },
        /* container: {
            flex: 1,
        }, */
        /* topMargin: {
            height: deviceUI.moderateScale(16),
            backgroundColor: "rgba(0, 0, 0, 0)",
        }, */
    });
}
