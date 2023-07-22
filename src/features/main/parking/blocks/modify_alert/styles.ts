import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useModifyModal() {
    const { deviceUI, theme } = useStyler();

    const toplevel = StyleSheet.create({
        contentContainer: {
            height: deviceUI.moderateScale(170),
            width: "90%",
        },
    });

    const etda = StyleSheet.create({
        container: {
            width: "100%",
            height: "100%",
        },
        timePickerContainer: {
            height: "80%",
            justifyContent: "center",
            alignItems: "center",
        },
        toModifyVehicleInfoContainer: {
            height: "20%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        toModifyVehicleInfoText: {
            marginRight: deviceUI.moderateScale(2),
            color: theme.colorFamily.blue,
            ...theme.font.researved.h5,
        },
    });

    const info = StyleSheet.create({
        container: {
            width: "100%",
            height: "100%",
            paddingBottom: deviceUI.moderateScale(10),
        },
    });

    return {
        toplevel,
        etda,
        info,
    };
}
