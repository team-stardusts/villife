import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useRegisterVehicleScreenStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
        },
        etdaPickerContainer: {
            height: deviceUI.moderateScale(170),
        },
        vehicleInfoInputsContainer: {
            height: deviceUI.moderateScale(250),
        },
    });
}
