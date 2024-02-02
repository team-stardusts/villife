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
            paddingTop: deviceUI.moderateScale(20),
        },
        searchingContainer: {
            marginBottom: deviceUI.moderateScale(30),
        },
        dateSettingContainer: {
            marginBottom: deviceUI.moderateScale(30),
        },
        roomSettingContainer: {
            marginBottom: deviceUI.moderateScale(15),
        },
    });

    const search = StyleSheet.create({
        container: {
            //flex: 1,
        },
        titleBox: {
            //height: "15%",
        },
        villaTitleBox: {
            //height: "15%",
            marginTop: deviceUI.moderateScale(13),
        },
        title: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(17),
        },
        inputBox: {
            height: deviceUI.moderateScale(40),
            justifyContent: "center",
            marginVertical: deviceUI.moderateScale(5),
        },
        inputWrapper: {
            height: "100%",
        },
        villaNameInputInvalid: {
            color: theme.color.specified.red,
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
        /* badgeBox: {
            width: "30%",
        },
        badge: {
            width: deviceUI.moderateScale(13),
        }, */
        registedBadge: {
            color: theme.color.specified.white,
            backgroundColor: theme.color.specified.blue,
        },
        unregistedBadge: {
            color: theme.color.specified.black,
            backgroundColor: theme.color.series.grey.level2,
        },
    });

    const room = StyleSheet.create({
        container: {
            //flex: 1,
        },
        row: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        titleBox: {
            //flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: deviceUI.moderateScale(10),
        },
        title: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(20),
        },
        contentContainer: {
            //flex: 9,
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
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(15),
        },
        rowText: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(15),
        },
        undergroundSettingBtn: {
            borderRadius: deviceUI.moderateScale(8),
            backgroundColor: theme.color.series.grey.level1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: deviceUI.moderateScale(6),
            paddingHorizontal: deviceUI.moderateScale(15),
            marginRight: deviceUI.moderateScale(10),
        },
        undergroundSettingBtnText: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(13),
        },
        roomsSettingBtn: {
            width: "80%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        roomsWrapper: {
            width: "100%",
            //height: "100%",
            borderRadius: deviceUI.moderateScale(10),
            borderWidth: 1,
            borderColor: theme.color.specified.lightblue,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: deviceUI.moderateScale(4),
        },
        roomsSettingIconWrapper: {
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            right: -deviceUI.moderateScale(25),
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
