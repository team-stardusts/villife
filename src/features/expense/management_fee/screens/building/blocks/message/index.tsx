import { TouchableOpacity, View } from "react-native";
import useBuildingTentantMessageStyles from "./styles";
import { BuildingTentantMessageProps } from "./types";
import Icon from "../../../../../../common/atoms/icon";

export default function Message({ onPress }: BuildingTentantMessageProps) {
    const styles = useBuildingTentantMessageStyles();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={() => onPress()}>
                <Icon name="letter" size={styles.icon.width} color={styles.icon.color} />
            </TouchableOpacity>
        </View>
    );
}
