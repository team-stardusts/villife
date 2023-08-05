import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useVehicleModifyModalStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            width: "100%",
            height: deviceUI.moderateScale(150),
            justifyContent: "center",
            alignItems: "center",
        },
        editContianer: {
            width: "90%",
            height: "95%",
        },
        infoContianer: {
            width: "90%",
            height: "95%",
        },
        successBtn: {
            color: theme.color.status.success,
        },
        warningBtn: {
            color: theme.color.status.warning,
        },
        disabledBtn: {
            color: theme.color.status.secondary,
        },
    });
}
