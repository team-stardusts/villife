import { StyleSheet } from "react-native";
import useStyler from "../../../common/hooks/styler/hooks";
import { HostType } from "../../../../libs/rest_apis/villife/auth/types";

export default function useSetAuthorityScreenStyles() {
    const { deviceUI, theme, safetyEdgeSize } = useStyler();

    const main = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.color.specified.white,
        },
        contents: {
            flex: 1,
            //height: deviceUI.getScreenSize().height - (safetyEdgeSize.top + safetyEdgeSize.bottom),
        },
        marginView: {
            marginTop: deviceUI.moderateScale(150),
        },
    });

    const userTypeIcon = StyleSheet.create({
        container: {
            paddingTop: deviceUI.moderateScale(100),
        },
        wrapper: {
            height: deviceUI.moderateScale(130),
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: deviceUI.moderateScale(5),
        },
    });

    const input = StyleSheet.create({
        container: {},
        inputBox: {
            height: deviceUI.moderateScale(85),
            marginBottom: deviceUI.moderateScale(10),
        },
        btnBox: {
            marginBottom: deviceUI.moderateScale(10),
        },
        btnDisabled: {
            borderRadius: deviceUI.moderateScale(10),
            backgroundColor: theme.color.specified.grey,
        },
    });

    return {
        main,
        userTypeIcon,
        input,
    };
}
