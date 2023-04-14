import { StyleSheet } from "react-native";
import useSystemInfo from "../../../hooks/systeminfo/hooks";
import useAppTheme from "../../../hooks/themes/hooks";
import { useNavigationViewStylesProps } from "./types";

export default function useNavigationViewStyles({ headerShown, BottomNavShown }: useNavigationViewStylesProps) {
    const sysinfo = useSystemInfo();
    const theme = useAppTheme();

    const headerFlex = headerShown ? 0.7 : 0;
    const bottomNavFlex = BottomNavShown ? 0.7 : 0;
    const contentsFlex = 10 - (headerFlex + bottomNavFlex);

    const styles = StyleSheet.create({
        toplevelBox: {
            flex: 1,
            backgroundColor: theme.colors.colorFamily.white,
        },
        headerBox: {
            flex: headerFlex,
            flexDirection: "row",
            backgroundColor: "tomato",
        },
        headerNavBox: {
            flex: 2,
        },
        headerNavIconBox: {
            flex: 1,
            height: "100%",
            alignItems: "center",
        },
        headerNavTitleBox: {
            flex: 1,
            height: "100%",
            alignItems: "center",
        },
        headerReactFuncBox: {
            flex: 8,
        },
        contentsBox: {
            flex: contentsFlex,
            backgroundColor: "teal",
        },
        bottomNavBox: {
            flex: bottomNavFlex,
            backgroundColor: theme.colors.colorFamily.white,
        },
    });

    return styles;
}
