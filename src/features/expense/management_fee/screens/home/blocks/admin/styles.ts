import { StyleSheet } from "react-native";
import useStyler from "../../../../../../common/hooks/styler/hooks";
import { SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE } from "../../../../../../common/constants";

export default function useAdminMFStyles() {
    const { theme, deviceUI } = useStyler();

    const main = StyleSheet.create({
        container: {
            flex: 1,
        },
        wrapper: {
            paddingHorizontal: deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE),
        },
    });

    return main;
}
