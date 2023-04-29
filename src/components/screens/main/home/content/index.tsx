import { Text, TouchableOpacity, View } from "react-native";
import Icon from "../../../../atoms/icon";
import useStyler from "../../../../../hooks/styler/hooks";
import { HomeScreenContentProps } from "./types";
import useHomeScreenContentStyles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../router/types";

export default function HomeScreenContent({ navigation, children }: HomeScreenContentProps) {
    const { deviceUI, theme } = useStyler();
    const styles = useHomeScreenContentStyles();
    const nav = useNavigation<VillifeNavigation>();

    return (
        <View style={styles.toplevelBox}>
            <TouchableOpacity style={styles.navigationBox} onPress={() => nav.push(navigation.to)}>
                <Text style={styles.navigationTitle}>{navigation.title}</Text>
                <Icon name="arrow-right" size={deviceUI.moderateScale(40)} color={theme.colorFamily.grey} />
            </TouchableOpacity>
            <View style={styles.childrenBox}>{children}</View>
        </View>
    );
}
