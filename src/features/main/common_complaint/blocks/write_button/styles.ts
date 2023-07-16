import { StyleSheet } from "react-native";
import { UseNotiWriteButtonStylesType } from "./type";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useNotiWriteButtonStyles(): UseNotiWriteButtonStylesType {
    const { deviceUI, theme } = useStyler();
    return StyleSheet.create({
        writeButton: {
            height: "100%",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingRight: deviceUI.moderateScale(15),
        },
        writeText: {
            ...theme.font.researved.h4,
        },
    });
}
