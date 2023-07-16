import { StyleSheet } from "react-native";
import { useNotiModifyButtonStylesType } from "./type";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useNotiModifyButtonStyles(): useNotiModifyButtonStylesType {
    const { deviceUI, theme } = useStyler();
    return StyleSheet.create({
        modifyButton: {
            height: "100%",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingRight: deviceUI.moderateScale(15),
        },
        modifyText: {
            ...theme.font.researved.h4,
        },
    });
}
