import { StyleSheet } from "react-native";
import useStyler from "../../../../../common/hooks/styler/hooks";

export default function useGuestVehicleDateSelectionModalStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            paddingVertical: deviceUI.moderateScale(10),
            justifyContent: "center",
            alignItems: "center",
        },
        datePicker: {
            width: deviceUI.getScreenSize().width * 0.9,
        },
        etdaPicker: {
            width: deviceUI.getScreenSize().width * 0.85,
            //height: deviceUI.moderateScale(135),
        },
    });
}
