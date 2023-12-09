import { StyleSheet } from "react-native";
import useStyler from "../../../../../../../common/hooks/styler/hooks";
import { SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE } from "../../../../../../../common/constants";

export default function useContractMemoStyles() {
    const { theme, deviceUI } = useStyler();

    const deleteBtnSize = deviceUI.moderateScale(25);

    return StyleSheet.create({
        container: {
            marginBottom: deviceUI.moderateScale(10),
        },
        subContainer: {
            paddingHorizontal: deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE),
        },
        deleteBtn: {
            zIndex: 1,
            position: "absolute",
            top: -deleteBtnSize * 0.2,
            right: -deleteBtnSize * 0.2 + deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE),
            width: deleteBtnSize,
            height: deleteBtnSize,
            borderRadius: deleteBtnSize,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.color.specified.black,
            transform: [
                {
                    rotateZ: "45deg",
                },
            ],
        },
        deleteIcon: {
            width: deviceUI.moderateScale(30),
            color: theme.color.specified.white,
        },
        wrapper: {
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-end",
            minHeight: deviceUI.getScreenSize().height * 0.05,
            paddingVertical: deviceUI.moderateScale(13),
            paddingHorizontal: deviceUI.moderateScale(15),
        },
        memoBox: {
            width: "100%",
            height: "100%",
        },
        memo: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(13),
        },
    });
}
