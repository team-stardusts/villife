import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useSendParkPushNotiScreenStyles() {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        container: {
            flex: 1,
        },
        screenGuideBox: {
            flex: 1.5,
        },
        messageBox: {
            flex: 8.5,
        },
    });

    const message = StyleSheet.create({
        container: {
            flex: 1,
        },
        messageRow: {
            height: theme.font.researved.h2.fontSize,
            marginVertical: deviceUI.moderateScale(15),
        },
        timeRow: {
            height: deviceUI.moderateScale(120),
            marginVertical: deviceUI.moderateScale(15),
        },
        timeFocused: {
            color: theme.colorFamily.blue,
        },
        timeUnfocused: {
            color: theme.colorFamily.lightblue,
        },
        message: {
            ...theme.font.researved.h2,
        },
        pressableMessageWrapper: {
            marginRight: deviceUI.moderateScale(10),
        },
        pressableMessage: {
            color: theme.colorFamily.blue,
            ...theme.font.researved.h2,
        },
        timeSelector: {
            height: deviceUI.getScreenSize().height * 0.33,
        },
    });

    return {
        main,
        message,
    };
}
