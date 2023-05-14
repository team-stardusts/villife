import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import RemoteCSS from "../../../../../libs/themes/remote_css";
import { ComplaintStatusLableStylesType } from "./types";

export default function useComplaintStatusLableStyle(): ComplaintStatusLableStylesType {
    const { deviceUI, theme } = useStyler();

    const Style = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
            borderRadius: deviceUI.moderateScale(10),
            width: deviceUI.moderateScale(52),
            height: deviceUI.moderateScale(20),
        },
        text: {
            fontSize: deviceUI.moderateScale(14),
            fontFamily: theme.font.fontFamilies.pretendard.bold,
            color: theme.colorFamily.black,
        },
    });
    return Style;
}
