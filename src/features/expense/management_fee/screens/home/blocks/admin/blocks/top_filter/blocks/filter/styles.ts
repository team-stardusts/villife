import { Platform, StyleSheet } from "react-native";
import useStyler from "../../../../../../../../../../common/hooks/styler/hooks";
import { UseFilterStylesProps } from "./types";

export default function useFilterStyles(props: UseFilterStylesProps) {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        container: {
            flex: 1,
        },
    });

    const nodes = StyleSheet.create({
        container: {
            flex: 1,
        },
        itemContainer: {
            //width: deviceUI.moderateScale(40),
            justifyContent: "center",
            alignItems: "center",
            marginLeft: deviceUI.moderateScale(15),
        },
        itemBox: {
            height: "60%",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: deviceUI.moderateScale(10),
            borderRadius: deviceUI.moderateScale(15),
            borderColor: props.filterStyle?.borderColor,
            backgroundColor: props.filterStyle?.backgroundColor || theme.color.specified.white,
            ...Platform.select({
                ios: {
                    shadowOpacity: 0.2,
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
        bumper: {
            width: deviceUI.moderateScale(5),
        },
        seletedItemBox: {
            backgroundColor: props.filterStyle?.selectedBackgroundColor || theme.color.specified.white,
            borderColor: props.filterStyle?.selectedBorderColor || theme.color.specified.black,
            borderWidth: 1.5,
            ...Platform.select({
                ios: {
                    shadowOpacity: 0.2,
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
        item: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(12),
            color: theme.color.specified.black,
        },
    });

    return {
        main,
        nodes,
    };
}
