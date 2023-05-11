import { StyleSheet, Text, View } from "react-native";
import { ParkingScreenGuideProps } from "./types";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function ParkingScreenGuide({ title, subtitle }: ParkingScreenGuideProps) {
    const { deviceUI, theme } = useStyler();
    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: deviceUI.moderateScale(80),
            marginBottom: deviceUI.moderateScale(20),
            justifyContent: "center",
            alignItems: "flex-start",
        },
        title: {
            color: theme.colorFamily.blue,
            marginBottom: deviceUI.moderateScale(10),
            ...theme.font.researved.h2,
        },
        subtitle: {
            color: theme.colorFamily.black,
            ...theme.font.researved.h5,
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    );
}
