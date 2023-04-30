import { StyleSheet } from "react-native";
import useSystemInfo from "../../../common/hooks/systeminfo/hooks";
import useAppThemeLegacy from "../../../common/hooks/themes_legacy/hooks";
import { CreateAccountScreenStylesType } from "./types";
import useStyler from "../../../common/hooks/styler/hooks";

export default function useCreateAccountScreenStyles(): CreateAccountScreenStylesType {
    const { deviceUI, theme } = useStyler();

    const Screen = StyleSheet.create({
        topLevelBox: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: theme.colorFamily.white,
        },
        screenWrapper: {
            flex: 1,
            paddingHorizontal: deviceUI.moderateScale(20),
        },
        contentsWrapper: {
            flex: 8,
        },
        marginView: {
            marginTop: deviceUI.moderateScale(150),
        },
    });

    const UserTypeIconSection = StyleSheet.create({
        toplevelBox: {
            flex: 2,
            flexDirection: "row",
            justifyContent: "space-evenly",
        },
    });

    const InputsSection = StyleSheet.create({
        topLevelBox: {
            flex: 6,
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: deviceUI.moderateScale(10),
        },
        inputsWrapper: {
            //height: "80%",
            flex: 1,
            width: "100%",
        },
        btnWrapper: {
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
        Screen,
        UserTypeIconSection,
        InputsSection,
    };
}
