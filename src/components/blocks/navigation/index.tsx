import { SafeAreaView, Text, View } from "react-native";
import Icon from "../../atoms/icon";
import useNavigationViewStyles from "./styles";
import NavigationViewProps from "./types";

export default function NavigationView(props: NavigationViewProps) {
    const styles = useNavigationViewStyles({ headerShown: true, BottomNavShown: true });

    return (
        <SafeAreaView style={styles.toplevelBox}>
            <View style={styles.headerBox}>
                <View style={styles.headerNavBox}>
                    <View style={styles.headerNavIconBox}>
                        <Icon name="arrow-left" size={80} />
                    </View>
                    <View style={styles.headerNavTitleBox}>
                        <Text>{props.headerOptions.title}</Text>
                    </View>
                </View>
                <View style={styles.headerReactFuncBox}></View>
            </View>
            <View style={styles.contentsBox}>{props.children}</View>
            <View style={styles.bottomNavBox}></View>
        </SafeAreaView>
    );
}
