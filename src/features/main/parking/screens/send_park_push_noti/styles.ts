import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useSendParkPushNotiScreenStyles() {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        navContainer: {
            backgroundColor: theme.color.specified.white,
        },
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
            //height: theme.font.researved.h2.fontSize,
            marginVertical: deviceUI.moderateScale(10),
        },
        myVehicleButton: {
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: deviceUI.moderateScale(3),
            paddingHorizontal: deviceUI.moderateScale(10),
            marginRight: deviceUI.moderateScale(5),
            borderRadius: deviceUI.moderateScale(10),
            backgroundColor: theme.color.specified.lightblue,
        },
        myVehicle: {
            ...theme.font.researved.h4,
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            color: theme.color.specified.white,
        },
        timeRow: {
            height: deviceUI.moderateScale(120),
            marginVertical: deviceUI.moderateScale(20),
        },
        timeFocused: {
            color: theme.color.specified.blue,
        },
        timeUnfocused: {
            color: theme.color.specified.lightblue,
        },
        message: {
            ...theme.font.researved.h2,
        },
        pressableMessageWrapper: {
            marginRight: deviceUI.moderateScale(10),
        },
        pressableMessage: {
            color: theme.color.specified.blue,
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
