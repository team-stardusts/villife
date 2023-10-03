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
        vehicleInfoPhoneNumberInputWrapper: {
            height: "50%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
        },
        vehicleInfoInputTitle: {
            ...theme.font.researved.h4,
            fontFamily: theme.font.fontFamily.pretendard.bold,
            color: theme.color.specified.blue,
            marginBottom: deviceUI.moderateScale(5),
        },
        vehicleInfoInput: {
            height: "50%",
        },
        vehiclePhonmberInput0: {
            height: "100%",
            width: "25%",
        },
        vehiclePhonmberInput1: {
            height: "100%",
            width: "35%",
        },
        vehiclePhonmberInput2: {
            height: "100%",
            width: "35%",
        },
    });
}
