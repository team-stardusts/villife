import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import SplashScreenProps from "./types";
import useSplashScreenStyles from "./styles";
import VillifeSpinner from "../../common/blocks/spinner/villife";

export default function SplashScreen({ navigation, route }: SplashScreenProps) {
    const styles = useSplashScreenStyles();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.indicatorBox}>
                {/* <VillifeSpinner iconColor={styles.villifeIcon.color} spinnerColor={styles.spinner.color} /> */}
                <ActivityIndicator size={"large"} color={styles.villifeIcon.color} />
            </View>
        </SafeAreaView>
    );
}
