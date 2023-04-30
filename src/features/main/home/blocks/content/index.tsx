import { Text, TouchableOpacity, View } from "react-native";
import Icon from "../../../../common/atoms/icon";
import useStyler from "../../../../common/hooks/styler/hooks";
import { HomeScreenContentProps } from "./types";
import useHomeScreenContentStyles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation, VILLIFE_ROOT_STACK_PARAMS } from "../../../../common/router/types";

export default function HomeScreenContent({ navigation, children, backgroundColor }: HomeScreenContentProps) {
    const { deviceUI, theme } = useStyler();
    const styles = useHomeScreenContentStyles();
    const nav = useNavigation<VillifeNavigation>();

    const navigate = () => {
        const finded = VILLIFE_ROOT_STACK_PARAMS.find((value) => value === navigation.to);

        if (finded !== undefined) {
            nav.reset({
                index: 0,
                routes: [{ name: navigation.to, params: navigation.params }],
            });
        } else {
            nav.push(navigation.to, navigation.params);
        }
    };

    return (
        <View style={styles.toplevelBox}>
            <TouchableOpacity style={styles.navigationBox} onPress={() => navigate()}>
                <View style={styles.navigationWrapper}>
                    <Text style={styles.navigationTitle}>{navigation.title}</Text>
                    <Icon name="arrow-right" size={deviceUI.moderateScale(40)} color={theme.colorFamily.grey} />
                </View>
            </TouchableOpacity>
            <View
                style={[
                    {
                        backgroundColor: backgroundColor,
                    },
                    styles.childrenBox,
                ]}>
                {children}
            </View>
        </View>
    );
}
