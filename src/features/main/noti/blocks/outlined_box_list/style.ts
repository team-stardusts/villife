import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useNotiOutLinedBoxListStyles() {
    const { deviceUI, theme } = useStyler();
    return StyleSheet.create({
        contentContainer: {
            alignItems: "center",
            width: "100%",
            paddingVertical: deviceUI.moderateScale(10),
        },
        whenLoading: {
            justifyContent: "center",
            height: deviceUI.getScreenSize().height * 0.7,
            //marginBottom: 50
        },
        whenEmptyCard: {
            minHeight: deviceUI.moderateScale(400),
            justifyContent: "center",
            alignItems: "center",
        },
        whenEmptyText: {
            alignItems: "center",
            justifyContent: "center",
        },
        whenEmptyCardText: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(17),
            marginBottom: deviceUI.moderateScale(10),
        },
    });
}
