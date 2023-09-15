import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import useNavigationViewSpace from "../../../../common/blocks/navigation/service";

export default function useMyPageHomeScreenStyles() {
    const { deviceUI, theme } = useStyler();
    const space = useNavigationViewSpace({
        applyDefaultHorizontalPadding: false,
        applyDefaultVerticalPadding: false,
        isBottomNavShown: true,
        isHeaderShown: true,
    });

    const main = StyleSheet.create({
        navContainer: {
            color: theme.color.specified.white,
        },
        container: {
            flex: 1,
        },
    });

    const mypanel = StyleSheet.create({
        container: {
            width: "100%",
            height: space.height * 0.35,
        },
        wrapper: {
            width: "100%",
            height: "100%",
            flexDirection: "row",
            backgroundColor: theme.color.specified.blue,
            justifyContent: "space-between",
            paddingVertical: deviceUI.moderateScale(20),
            paddingHorizontal: deviceUI.moderateScale(20),
        },
        managementBox: {
            justifyContent: "flex-start",
            alignItems: "center",
        },
        managementIcon: {
            width: deviceUI.moderateScale(120),
            color: theme.color.specified.white,
        },
        managementBtn: {
            justifyContent: "center",
            alignItems: "center",
            borderRadius: deviceUI.moderateScale(12),
            marginTop: deviceUI.moderateScale(10),
            paddingVertical: deviceUI.moderateScale(7),
            paddingHorizontal: deviceUI.moderateScale(15),
            backgroundColor: theme.color.specified.lightblue,
        },
        managementBtnText: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(13),
            color: theme.color.specified.white,
        },
        infoBox: {
            justifyContent: "flex-start",
            alignItems: "center",
        },
        infoContainer: {
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingVertical: deviceUI.moderateScale(10),
            marginRight: deviceUI.moderateScale(10),
        },
        infoRow: {
            width: "100%",
            justifyContent: "center",
            alignItems: "flex-end",
            marginVertical: deviceUI.moderateScale(5),
        },
        infoTitle: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(25),
            color: theme.color.specified.white,
        },
        info: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(13),
            color: theme.color.specified.white,
        },
    });

    const scrollNav = StyleSheet.create({
        container: {
            width: "100%",
            height: space.height * 0.65,
        },
        wrapper: {
            height: "100%",
            paddingVertical: deviceUI.moderateScale(15),
            paddingLeft: deviceUI.moderateScale(15),
        },
        btnCotainer: {
            width: "100%",
            marginVertical: deviceUI.moderateScale(12),
        },
        btn: {
            justifyContent: "center",
            alignItems: "flex-start",
        },
        btnText: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(18),
            color: theme.color.specified.black,
        },
    });

    return {
        main,
        mypanel,
        scrollNav,
    };
}
