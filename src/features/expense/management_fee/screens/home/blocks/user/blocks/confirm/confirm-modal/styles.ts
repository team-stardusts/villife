import { StyleSheet } from "react-native";
import useStyler from "../../../../../../../../../common/hooks/styler/hooks";
import {
    SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE,
    SCREEN_PADDING_VERTICAL_STANDARD_VALUE,
} from "../../../../../../../../../common/constants";

export default function usePaymentInfoInputModalStyles() {
    const { deviceUI, theme } = useStyler();

    const height = deviceUI.getScreenSize().height * 0.5;

    return StyleSheet.create({
        container: {
            width: "100%",
            height: height,
            paddingVertical: deviceUI.moderateScale(SCREEN_PADDING_VERTICAL_STANDARD_VALUE),
            paddingHorizontal: deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE),
        },
        subject: {
            marginTop: deviceUI.moderateScale(10),
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.black,
        },
        inputBox: {
            marginVertical: deviceUI.moderateScale(10),
            height: height * 0.1,
        },
        calendarBox: {
            marginTop: deviceUI.moderateScale(10),
        },
        calendar: {
            width: deviceUI.getScreenSize().width * 0.8,
        },
    });
}
