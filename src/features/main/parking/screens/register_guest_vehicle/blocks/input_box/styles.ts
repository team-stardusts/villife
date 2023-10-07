import { StyleSheet } from "react-native";
import useStyler from "../../../../../../common/hooks/styler/hooks";

export default function useGuestVehicleInfoInputBoxStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
            //justifyContent: "center",
        },
        vehicleInfoInputContainer: {
            minheight: deviceUI.moderateScale(70),
            maxHeight: deviceUI.getScreenSize().height * 0.1,
            paddingVertical: deviceUI.moderateScale(5),
            justifyContent: "center",
        },
        vehicleInfoInputWrapper: {
            height: "50%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginBottom: deviceUI.moderateScale(10),
        },
        vehicleInfoInput: {
            height: "50%",
            marginBottom: deviceUI.moderateScale(10),
        },
        vehicleInfoInputTitle: {
            ...theme.font.researved.h4,
            fontFamily: theme.font.fontFamily.pretendard.bold,
            color: theme.color.specified.blue,
            marginBottom: deviceUI.moderateScale(5),
        },
    });
}
