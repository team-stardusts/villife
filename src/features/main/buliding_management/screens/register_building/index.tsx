import { View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import RegisterBuildingScreenProps from "./types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useRegisterBuildingScreenStyles from "./styles";

export default function RegisterBuildingScreen({ navigation, route }: RegisterBuildingScreenProps) {
    const messages = useScreenMessage().messages;
    const styles = useRegisterBuildingScreenStyles();

    return (
        <NavigationView
            headerOptions={{
                title: "건물 추가하기",
                backgroundColor: styles.nav.backgroundColor,
                hideBuidingSelector: true,
            }}
            bodyOptions={{
                backgroundColor: styles.nav.backgroundColor,
                applyDefaultHorizontalPadding: true,
                applyDefaultVerticalPadding: false,
            }}
            bottomNavOptions={{
                shown: false,
            }}>
            <View style={styles.container}></View>
        </NavigationView>
    );
}
