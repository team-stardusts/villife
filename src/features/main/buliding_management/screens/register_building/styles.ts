import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useBuildingManagementScreenStyles() {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        nav: {
            backgroundColor: theme.color.specified.white,
            color: theme.color.series.grey.level1,
        },
        container: {
            flex: 1,
        },
        searchingContainer: {
            flex: 2,
        },
        roomSettingContainer: {
            flex: 8,
        },
    });

    const search = StyleSheet.create({
        container: {
            flex: 1,
        },
        titleBox: {
            height: "20%",
        },
        title: {
            color: theme.color.specified.blue,
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(17),
        },
        searcherBox: {
            height: "30%",
            justifyContent: "center",
            marginVertical: deviceUI.moderateScale(5),
        },
        searcher: {
            height: "90%",
        },
        magnifierBox: {
            position: "absolute",
            alignSelf: "flex-end",
            width: "10%",
            height: "100%",
            justifyContent: "center",
            alignItems: "flex-end",
            paddingRight: deviceUI.moderateScale(15),
        },
        magnifierIcon: {
            width: deviceUI.moderateScale(30),
            color: theme.color.specified.black,
        },
        badgeBox: {
            height: "30%",
            width: "30%",
        },
        badge: {
            width: deviceUI.moderateScale(13),
        },
    });

    const room = StyleSheet.create({
        container: {
            flex: 1,
        },
        titleBox: {
            flex: 1,
            justifyContent: "center",
        },
        title: {
            color: theme.color.specified.blue,
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(20),
        },
        contentContainer: {
            flex: 9,
        },
        rowContaier: {
            height: deviceUI.moderateScale(30),
            flexDirection: "row",
            marginVertical: deviceUI.moderateScale(10),
        },
        floorBox: {
            width: "20%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginRight: deviceUI.moderateScale(30),
        },
        roomBox: {
            width: "20%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
        },
        blankBox: {
            width: "60%",
            height: "100%",
            justifyContent: "center",
            alignItems: "flex-end",
            paddingRight: deviceUI.moderateScale(40),
        },
        header: {
            color: theme.color.specified.blue,
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(15),
        },
        rowText: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(15),
        },
        undergroundSettingBtn: {
            width: "60%",
            height: "100%",
            borderRadius: deviceUI.moderateScale(8),
            backgroundColor: theme.color.series.grey.level1,
            justifyContent: "center",
            alignItems: "center",
        },
        undergroundSettingBtnText: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(13),
        },
        roomsWrapper: {
            width: "80%",
            height: "100%",
            borderRadius: deviceUI.moderateScale(10),
            borderWidth: 1,
            borderColor: theme.color.specified.lightblue,
            justifyContent: "center",
            alignItems: "center",
        },
        roomsSettingBtnWrapper: {
            width: "100%",
            justifyContent: "center",
            alignItems: "flex-start",
        },
        roomsSettingBtn: {
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
            left: -deviceUI.moderateScale(5),
        },
        roomsSettingIcon: {
            width: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
        },
        addtionIcon: {
            width: deviceUI.moderateScale(50),
            color: theme.color.specified.black,
        },
    });

    return {
        main,
        search,
        room,
    };
}
