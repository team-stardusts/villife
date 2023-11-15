import { StyleSheet } from "react-native";
import useStyler from "../../../../../common/hooks/styler/hooks";
import useNavigationViewSpace from "../../../../../common/blocks/navigation/service";
import useUserInformation from "../../../../../common/hooks/service/user_info";

export default function useVehicleListStyles() {
    const { deviceUI, theme } = useStyler();
    const user = useUserInformation();

    const space = useNavigationViewSpace({
        isHeaderShown: true,
        isBottomNavShown: true,
        applyDefaultHorizontalPadding: true,
        applyDefaultVerticalPadding: false,
    });

    const main = StyleSheet.create({
        container: {
            minHeight: space.height * (user?.isAdmin ? 0.95 : 0.58),
            marginBottom: deviceUI.moderateScale(15),
        },
        contentBox: {
            backgroundColor: theme.color.specified.white,
        },
        wrapper: {
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingTop: deviceUI.moderateScale(5),
            paddingBottom: deviceUI.moderateScale(20),
        },
    });

    const row = StyleSheet.create({
        container: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
        },
        vehicleInfoBox: {
            width: "55%",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginVertical: deviceUI.moderateScale(15),
        },
        tenantBadge: {
            width: deviceUI.moderateScale(13),
            color: theme.color.specified.white,
            backgroundColor: theme.color.specified.grey,
        },
        guestBadge: {
            width: deviceUI.moderateScale(13),
            color: theme.color.specified.black,
            backgroundColor: theme.color.specified.green,
        },
        plateNumber: {
            marginLeft: deviceUI.moderateScale(10),
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.black,
        },
        communicationFuncContainer: {
            flexDirection: "row",
            justifyContent: "flex-start",
        },
        communicationIconBox: {
            marginRight: deviceUI.moderateScale(5),
            padding: deviceUI.moderateScale(5),
        },
        icon: {
            color: theme.color.specified.black,
        },
        disabledIcon: {
            color: theme.color.specified.lightgrey,
        },
        phoneIcon: {
            width: deviceUI.moderateScale(35),
        },
        letterIcon: {
            width: deviceUI.moderateScale(45),
        },
        detailFuncContainer: {
            position: "absolute",
            right: deviceUI.moderateScale(3),
            justifyContent: "flex-end",
        },
        detailIconBox: {
            //backgroundColor: "teal",
            padding: deviceUI.moderateScale(5),
        },
        detailIcon: {
            width: deviceUI.moderateScale(50),
            color: theme.color.specified.black,
        },
    });

    return {
        main,
        row,
    };
}
