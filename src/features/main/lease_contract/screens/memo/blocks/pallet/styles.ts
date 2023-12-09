import { StyleSheet } from "react-native";
import useStyler from "../../../../../../common/hooks/styler/hooks";

export default function useMemoPalletStyles() {
    const { deviceUI } = useStyler();
    return StyleSheet.create({
        container: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: deviceUI.moderateScale(15),
        },
        colorSelector: {
            width: "15%",
            height: deviceUI.moderateScale(20),
            borderRadius: deviceUI.moderateScale(10),
        },
    });
}
