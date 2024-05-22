import { StyleSheet } from "react-native";
import useStyler from "../../../../../common/hooks/styler/hooks";

export default function useVehicleDetailModalStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            width: "100%",
        },
        row: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: deviceUI.moderateScale(20),
            marginBottom: deviceUI.moderateScale(10),
        },
        key: {
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(14),
            color: theme.color.specified.black,
        },
        value: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(12),
            color: theme.color.specified.black,
        },
    });
}
