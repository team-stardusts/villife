import { Platform, StyleSheet } from "react-native";
import useStyler from "../../hooks/styler/hooks";

export default function useHomeScreenContentStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        toplevelBox: {
            width: "100%",
            height: deviceUI.moderateScale(200),
            //height: deviceUI.screenSize.height / 5,
        },
        navigationBox: {
            flex: 2,
        },
        navigationWrapper: {
            width: "40%",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
        },
        navigationTitle: {
            color: theme.colorFamily.black,
            marginBottom: deviceUI.moderateScale(5),
            ...theme.font.researved.h2,
        },
        childrenBox: {
            flex: 8,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: deviceUI.moderateScale(15),
            marginBottom: deviceUI.moderateScale(15),
            ...Platform.select({
                ios: {
                    shadowColor: theme.colorFamily.darkgrey,
                    shadowOpacity: 0.3,
                    shadowRadius: deviceUI.moderateScale(2),
                    shadowOffset: {
                        height: 6,
                        width: 0,
                    },
                },
                android: {
                    elevation: 5,
                },
            }),
        },
    });
}
