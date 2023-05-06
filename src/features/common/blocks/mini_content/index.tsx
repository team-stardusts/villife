import { Text, TouchableOpacity, View } from "react-native";
import Icon from "../../atoms/icon";
import useStyler from "../../hooks/styler/hooks";
import { MiniContentProps } from "./types";
import useHomeScreenContentStyles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation, VILLIFE_ROOT_STACK_PARAMS } from "../../router/types";
import ContentBox from "../content_box";

export default function MiniContent({ title, navigation, children, backgroundColor }: MiniContentProps) {
    const { deviceUI, theme } = useStyler();
    const styles = useHomeScreenContentStyles();
    const nav = useNavigation<VillifeNavigation>();

    const navigate = () => {
        if (navigation !== undefined) {
            const finded = VILLIFE_ROOT_STACK_PARAMS.find((value) => value === navigation.to);

            if (finded !== undefined) {
                nav.reset({
                    index: 0,
                    routes: [{ name: navigation.to, params: navigation.params }],
                });
            } else {
                nav.push(navigation.to, navigation.params);
            }
        }
    };

    return (
        <View style={styles.toplevelBox}>
            <TouchableOpacity
                style={styles.navigationBox}
                onPress={() => navigate()}
                disabled={navigation === undefined}>
                <View style={styles.navigationWrapper}>
                    <Text style={styles.navigationTitle}>{title}</Text>
                    {navigation && (
                        <Icon name="arrow-right" size={deviceUI.moderateScale(40)} color={theme.colorFamily.grey} />
                    )}
                </View>
            </TouchableOpacity>
            <View style={styles.contentWrapper}>
                <ContentBox backgroundColor={backgroundColor}>{children}</ContentBox>
            </View>
        </View>
    );
}
