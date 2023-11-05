import { Text, TouchableOpacity } from "react-native";
import { SocialLoginButtonProps } from "./types";
import { View } from "react-native";
import Icon from "../../../../../common/atoms/icon";
import useLoginButtonStyles from "./styles";
import { IconSeries } from "../../../../../common/atoms/icon/types";

export default function LoginButton(props: SocialLoginButtonProps) {
    const styles = useLoginButtonStyles(props.provider);

    let iconName: IconSeries;

    switch (props.provider) {
        case "apple":
            iconName = "apple-logo";
            break;
        default:
            iconName = "villife";
    }

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.6} onPress={() => props.onPress(props.provider)}>
            {props.provider !== "villife" && (
                <View style={styles.iconWrapper}>
                    <Icon name={iconName} size={styles.icon.width} color={styles.icon.color} />
                </View>
            )}
            <Text style={styles.btnTxt} adjustsFontSizeToFit numberOfLines={1}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
}
