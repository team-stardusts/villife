import { ColorValue, StyleSheet, Text, View } from "react-native";
import useStyler from "../../hooks/styler/hooks";

type BadgeProps = {
    title: string;
    size?: number;
    color?: ColorValue;
    bgColor?: ColorValue;
};

export default function Badge({ size, color, title, bgColor }: BadgeProps) {
    const { deviceUI, theme } = useStyler();

    const styles = StyleSheet.create({
        box: {
            backgroundColor: bgColor ?? "lightgrey",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: size ? size * 1.2 : 18,
            paddingVertical: size ? size * 0.2 : 3,
            paddingHorizontal: size ? size * 0.8 : 3,
        },
        title: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: size ?? deviceUI.moderateScale(15),
            color: color ?? "black",
        },
    });

    return (
        <View style={styles.box}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}
