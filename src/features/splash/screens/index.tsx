import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import SplashScreenProps from "./types";
import useSplashScreenStyles from "./styles";

export default function SplashScreen({ navigation, route }: SplashScreenProps) {
    const styles = useSplashScreenStyles();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.indicatorBox}>
                <ActivityIndicator size={"large"} color={styles.indicator.color} />
            </View>
        </SafeAreaView>
    );
}
