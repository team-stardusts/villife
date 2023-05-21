import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useVehicleInfoInputBoxStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
        },
        vehicleInfoInputContainer: {
            height: "50%",
            //marginBottom: deviceUI.moderateScale(15),
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
