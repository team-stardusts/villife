import { TouchableOpacity, View } from "react-native";
import Icon from "../../../../common/atoms/icon";
import useBuildingTentantMessageStyles from "./styles";

export default function BuildingTentantMessage() {
    const styles = useBuildingTentantMessageStyles();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} activeOpacity={0.6}>
                <Icon name="letter" size={styles.icon.width} color={styles.icon.color} />
            </TouchableOpacity>
        </View>
    );
}
