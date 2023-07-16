import { StyleSheet } from "react-native";
import useStyler from "../../../common/hooks/styler/hooks";

export default function useCreateAccountScreenStyles() {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colorFamily.white,
        },
        wrapper: {
            flex: 1,
            paddingHorizontal: deviceUI.moderateScale(22),
        },
        contentWrapper: {
            height: deviceUI.getScreenSize().height * 0.7,
        },
        marginView: {
            marginTop: deviceUI.moderateScale(150),
        },
    });

    const userTypeIcon = StyleSheet.create({
        container: {
            height: main.contentWrapper.height * 0.2,
            flexDirection: "row",
            justifyContent: "space-evenly",
        },
    });

    const input = StyleSheet.create({
        container: {
            height: main.contentWrapper.height * 0.8,
            paddingTop: deviceUI.moderateScale(10),
        },
        inputBox: {
            width: "100%",
            height: deviceUI.moderateScale(30),
            marginBottom: deviceUI.moderateScale(70),
        },
        btnBox: {
            flex: 3,
            marginBottom: deviceUI.moderateScale(10),
        },
        btnDisabled: {
            flex: 1,
            borderRadius: deviceUI.moderateScale(10),
            backgroundColor: theme.colorFamily.grey,
        },
    });

    return {
        main,
        userTypeIcon,
        input,
    };
}
