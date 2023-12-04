import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useMemoEditScreenStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        nav: {
            backgroundColor: theme.color.specified.white,
            //color: theme.color.series.grey.level1,
        },
        container: {
            flex: 1,
        },
        inputBox: {
            minHeight: deviceUI.getScreenSize().height * 0.3,
            backgroundColor: theme.color.specified.lightblue,
            borderRadius: deviceUI.moderateScale(10),
            marginVertical: deviceUI.moderateScale(20),
            paddingTop: deviceUI.moderateScale(10),
            paddingHorizontal: deviceUI.moderateScale(10),
            ...deviceUI.select({
                ios: {
                    //shadowColor: theme.color.specified.darkgrey,
                    shadowOpacity: 0.4,
                    shadowRadius: deviceUI.moderateScale(10),
                    shadowOffset: {
                        height: 0,
                        width: 0,
                    },
                },
                android: {
                    elevation: 3,
                },
            }),
        },
        inputWrapper: {},
        input: {
            //backgroundColor: "red",
        },
    });
}
