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
            paddingTop: deviceUI.moderateScale(30),
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
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.white,
        },
        timeRow: {
            height: deviceUI.moderateScale(80),
            marginVertical: deviceUI.moderateScale(20),
        },
        timeFocused: {
            color: theme.color.specified.blue,
        },
        timeUnfocused: {
            color: theme.color.specified.lightblue,
        },
        message: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(18),
            color: theme.color.specified.black,
        },
        disabledMessage: {
            color: theme.color.series.grey.level2,
        },
        checkboxContainer: {
            flexDirection: "row",
            alignItems: "center",
        },
        checkbox: {
            width: deviceUI.getScreenSize().width * 0.065,
            height: deviceUI.getScreenSize().width * 0.065,
            borderRadius: deviceUI.getScreenSize().width * 0.065,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: theme.color.specified.lightgrey,
            backgroundColor: theme.color.series.grey.level1,
            marginRight: deviceUI.moderateScale(10),
        },
        checkboxInnerCircle: {
            width: deviceUI.getScreenSize().width * 0.043,
            height: deviceUI.getScreenSize().width * 0.043,
            borderRadius: deviceUI.getScreenSize().width * 0.043,
        },
        enabledCheckboxInnerCircle: {
            backgroundColor: theme.color.specified.blue,
        },
    });

    return {
        main,
        message,
    };
}
