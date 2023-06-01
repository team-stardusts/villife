import { StyleSheet } from "react-native";
import { UseApprovalRequiredModalStylesType } from "./type";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useApprovalRequiredModalStyles(): UseApprovalRequiredModalStylesType {
    const { deviceUI, theme } = useStyler();
    return StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            //backgroundColor: "rgba(255,255,255,0.6)",
        },
        wrapper: {
            position: "absolute",
            top: 0,
            left: 0,
            height: deviceUI.screenSize.height,
            width: deviceUI.screenSize.width,
            backgroundColor: theme.colorFamily.lightgrey,
            opacity: 0.6,
            zIndex: -1,
        },
        content: {
            width: "88%",
            backgroundColor: "white",
            flex: 0,
            borderRadius: deviceUI.moderateScale(15),
            overflow: "hidden",
            elevation: 5, // Android only
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 2,
        },
        textSection: {
            justifyContent: "center",
            alignItems: "center",
        },
        imageSection: {
            width: "80%",
            justifyContent: "center",
            alignItems: "center",
        },
        childrenSection: {
            justifyContent: "center",
            alignItems: "center",
        },
        buttonSection: {
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
        },
        title: {
            color: theme.colorFamily.black,
            textAlign: "center",
            ...theme.font.researved.h3,
        },
        subtitle: {
            marginTop: deviceUI.moderateScale(5),
            color: theme.colorFamily.grey,
            textAlign: "center",
            ...theme.font.researved.h5,
        },
        leftButtonText: {
            color: theme.colorFamily.black,
            ...theme.font.researved.h5,
        },
        rightButtonText: {
            color: theme.colorFamily.white,
            ...theme.font.researved.h5,
        },
        leftButton: {
            height: "80%",
            width: "40%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#EEEEEE",
            borderRadius: deviceUI.moderateScale(8),
            marginRight: deviceUI.moderateScale(10),
        },
        rightButton: {
            height: "80%",
            width: "40%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colorFamily.blue,
            borderRadius: deviceUI.moderateScale(8),
        },
    });
}
