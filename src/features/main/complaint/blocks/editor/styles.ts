import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import RemoteCSS from "../../../../../libs/themes/remote_css";
import useOnKeyboardEvent from "../../../../common/hooks/keyboard";
import { useState } from "react";
import useNavigationViewSpace from "../../../../common/blocks/navigation/service";

export default function useComplaintEditorStyle() {
    const { deviceUI, theme, safetyEdgeSize } = useStyler();
    const safetySpace = useNavigationViewSpace({
        applyDefaultHorizontalPadding: false,
        applyDefaultVerticalPadding: false,
        isBottomNavShown: false,
        isHeaderShown: true,
    });
    const [isKeyboardFold, setIsKeyboardFold] = useState<boolean>();
    const keyboardHeight = useOnKeyboardEvent({
        onShow: () => setIsKeyboardFold(false),
        onHide: () => setIsKeyboardFold(true),
    });

    const titleHeight = deviceUI.moderateScale(60);
    const richBarHeight = deviceUI.moderateScale(50);
    const richHeight = safetySpace.height - (titleHeight + richBarHeight + keyboardHeight) + safetyEdgeSize.bottom;

    const main = StyleSheet.create({
        scroll: {
            flex: 1,
        },
        rich: {
            height: richHeight,
        },
        richBar: {
            position: "absolute",
            width: deviceUI.getScreenSize().width,
            height: richBarHeight,
            backgroundColor: "rgba(83, 156, 241,0.2)",
            ...deviceUI.select({
                android: {
                    bottom: 0,
                },
                ios: {
                    bottom: isKeyboardFold ? 0 : keyboardHeight - safetyEdgeSize.bottom,
                },
            }),
        },
        // SafetyAreaView의 backgroundColor로 인해
        // 커버되지 않는 구간을 커버하기 위함
        richBarDummyView: {
            position: "absolute",
            width: "100%",
            height: deviceUI.getScreenSize().height * 0.3,
            bottom: deviceUI.getScreenSize().height * -0.3,
            backgroundColor: "rgba(83, 156, 241,0.2)",
        },
        title: {
            minHeight: titleHeight,
            fontSize: deviceUI.moderateScale(30),
            marginLeft: "3%",
            fontFamily: theme.font.fontFamily.pretendard.bold,
        },
        tib: {
            textAlign: "center",
        },
        flatStyle: {
            paddingHorizontal: deviceUI.moderateScale(10),
            fontFamily: theme.font.fontFamily.pretendard.bold,
        },
        placeHolderColor: {
            color: theme.color.series.grey.level2,
        },
    });

    const editorCSS = {
        initialCSSText: `${RemoteCSS.getPretendardBold()}`,
        backgroundColor: theme.color.specified.white as string,
        color: theme.color.specified.black as string,
        caretColor: theme.color.specified.red as string,
        placeholderColor: theme.color.series.grey.level2 as string,
        contentCSSText: `font-family:${theme.font.fontFamily.pretendard.semiBold}`,
    };

    return {
        main,
        editorCSS,
    };
}
