import { StyleSheet } from "react-native";
import { ComplaintHomeScreenStylesType } from "./type";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useCreateAccountScreenStyles(): ComplaintHomeScreenStylesType {
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
    return {
        Screen,
    };
}
