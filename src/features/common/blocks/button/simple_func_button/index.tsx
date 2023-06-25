import { GestureResponderEvent, StyleSheet, Text, TextProps, TouchableOpacity, View } from "react-native";
import Icon from "../../../atoms/icon";
import { IconSeries } from "../../../atoms/icon/types";
import useStyler from "../../../hooks/styler/hooks";

type SimpleFuncButtonProps = {
    icon?: {
        name: IconSeries;
        size: number;
    };
    title: string;
    titleStyle?: TextProps["style"];
    onPress?(event: GestureResponderEvent): void;
};

export default function SimpleFuncButton({ icon, title, titleStyle, onPress }: SimpleFuncButtonProps) {
    const { deviceUI, theme } = useStyler();

    const styles = StyleSheet.create({
        touchBox: {
            width: "100%",
            flexDirection: "row",
            backgroundColor: theme.colorFamily.lightblue,
            borderRadius: deviceUI.moderateScale(8),
            paddingHorizontal: deviceUI.moderateScale(5),
            paddingVertical: deviceUI.moderateScale(5),
            justifyContent: "space-between",
            alignItems: "center",
        },
        title: {
            color: theme.colorFamily.white,
            fontWeight: "bold",
            ...theme.font.researved.h5,
        },
    });

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            style={styles.touchBox}
            onPress={(event) => {
                if (onPress !== undefined) onPress(event);
            }}>
            {icon && <Icon name={icon.name} size={icon.size} color={theme.colorFamily.white} />}
            <Text
                style={titleStyle ?? styles.title}
                ellipsizeMode="tail"
                minimumFontScale={0.5}
                maxFontSizeMultiplier={1}
                adjustsFontSizeToFit={true}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}
