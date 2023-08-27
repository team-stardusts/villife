import { StyleSheet } from "react-native";
import useStyler from "../../../../../hooks/styler/hooks";

export default function useBuildingSelectModalStyles() {
    const { deviceUI, theme } = useStyler();

    const modalHeight = deviceUI.getScreenSize().height * 0.45;

    const modal = StyleSheet.create({
        modal: {
            maxHeight: modalHeight,
        },
        container: {
            marginBottom: 30,
        },
        buildingComponent: {
            height: deviceUI.moderateScale(55),
            margin: deviceUI.moderateScale(15),
        },
    });

    const component = StyleSheet.create({
        container: {
            paddingHorizontal: deviceUI.moderateScale(10),
        },
        wrapper: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
        iconBox: {
            width: "15%",
            alignItems: "center",
            justifyContent: "center",
        },
        icon: {
            width: deviceUI.moderateScale(45),
            color: theme.color.specified.black,
        },
        textBox: {
            width: "85%",
            alignItems: "flex-start",
            justifyContent: "center",
        },
        text: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(16),
        },
    });

    return {
        modal,
        component,
    };
}
