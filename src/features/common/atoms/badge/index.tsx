import { StyleSheet, Text, View } from "react-native";

type BadgeProps = {
    title: string;
    size?: number;
    color?: string;
    bgColor?: string;
};

export default function Badge({ size, color, title, bgColor }: BadgeProps) {
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
            fontSize: size ?? 15,
            color: color ?? "black",
            fontWeight: size && size > 12 ? "bold" : "100",
        },
    });

    return (
        <View style={styles.box}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}
