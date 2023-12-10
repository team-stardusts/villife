import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import useNavigationViewSpace from "../../../../common/blocks/navigation/service";
import useOnKeyboardEvent from "../../../../common/hooks/keyboard";

export default function useMemoEditScreenStyles() {
    const { deviceUI, theme } = useStyler();
    const space = useNavigationViewSpace({
        isHeaderShown: false,
        isBottomNavShown: false,
        applyDefaultVerticalPadding: false,
        applyDefaultHorizontalPadding: true,
    });

    const keyboardHeight = useOnKeyboardEvent();

    return StyleSheet.create({
        nav: {
            backgroundColor: theme.color.specified.white,
            //color: theme.color.series.grey.level1,
        },
        container: {
            flex: 1,
        },
        inputBox: {
            //minHeight: deviceUI.getScreenSize().height * 0.3,
            backgroundColor: theme.color.specified.lightblue,
            borderRadius: deviceUI.moderateScale(10),
            marginVertical: deviceUI.moderateScale(20),
            paddingHorizontal: deviceUI.moderateScale(10),
            ...deviceUI.select({
                ios: {
                    //shadowColor: theme.color.specified.darkgrey,
                    shadowOpacity: 0.4,
                    shadowRadius: deviceUI.moderateScale(3),
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
        inputWrapper: {
            height: keyboardHeight === 0 ? space.height * 0.75 : space.height * 0.77 - keyboardHeight,
        },
        input: {
            paddingTop: deviceUI.moderateScale(10),
            textAlignVertical: "top",
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(16),
            color: theme.color.specified.black,
        },
        txtLenWrapper: {
            alignItems: "flex-end",
            marginVertical: deviceUI.moderateScale(10),
            paddingRight: deviceUI.moderateScale(10),
        },
        txtLen: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(13),
        },
    });
}
