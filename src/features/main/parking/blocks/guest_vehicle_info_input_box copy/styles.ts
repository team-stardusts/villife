import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useGuestVehicleInfoInputBoxStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
        },
        vehicleInfoInputContainer: {
            height: "30%",
            paddingVertical: deviceUI.moderateScale(5),
            justifyContent: "center",
        },
        vehicleInfoInputTitle: {
            ...theme.font.researved.h4,
            fontFamily: theme.font.fontFamilies.pretendard.bold,
            color: theme.colorFamily.blue,
            marginBottom: deviceUI.moderateScale(5),
        },
    });
}
