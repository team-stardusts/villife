import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useRegisterVehicleScreenStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
        },
        navView: {
            backgroundColor: theme.color.specified.white,
        },
        etdaPickerContainer: {
            height: deviceUI.moderateScale(170),
            paddingHorizontal: deviceUI.moderateScale(2),
        },
        vehicleInfoInputsContainer: {
            height: deviceUI.moderateScale(250),
        },
    });
}
