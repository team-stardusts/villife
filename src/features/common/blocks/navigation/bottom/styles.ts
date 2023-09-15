import { StyleSheet } from "react-native";
import useStyler from "../../../hooks/styler/hooks";

export default function useNavigationViewBottomStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
        },
        // SafetyAreaView의 backgroundColor로 인해
        // 커버되지 않는 구간을 커버하기 위함
        dummyView: {
            position: "absolute",
            width: "100%",
            height: deviceUI.getScreenSize().height * 0.3,
            bottom: deviceUI.getScreenSize().height * -0.3 + 1,
            backgroundColor: "white",
        },
        menuBox: {
            width: "101%",
            height: "100%",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: deviceUI.moderateScale(5),
            backgroundColor: theme.color.specified.white,
            borderColor: theme.color.specified.lightgrey,
            borderWidth: deviceUI.moderateScale(1),
            borderBottomWidth: 0,
            borderTopLeftRadius: deviceUI.moderateScale(25),
            borderTopRightRadius: deviceUI.moderateScale(25),
        },
        wrapper: {
            width: "18%",
            alignItems: "center",
        },
        iconBox: {
            flex: 5, //deviceUI.getPlatform() === "ios" ? 4 : 5,
            justifyContent: "flex-end",
            //paddingBottom: deviceUI.horizontalScale(0.05),
            marginBottom: deviceUI.moderateScale(2),
        },
        icon: {
            width: deviceUI.moderateScale(50),
        },
        selected: {
            color: theme.color.specified.black,
        },
        unselected: {
            color: theme.color.specified.lightgrey,
        },
        captionBox: {
            flex: 5, //deviceUI.getPlatform() === "ios" ? 6 : 5,
        },
        caption: {
            ...theme.font.researved.h5,
            fontSize: deviceUI.moderateScale(12),
        },
    });
}
