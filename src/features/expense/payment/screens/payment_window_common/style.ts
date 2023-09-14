import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function usePaymentCommonScreenStyles() {
    const { deviceUI, theme } = useStyler();

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: "90%",
        },
        btn: {
            height: "10%",
            backgroundColor: "teal",
            justifyContent: "center",
            alignItems: "center",
        },
    });

    return styles;
}
