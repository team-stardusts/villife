import { TouchableOpacity, View } from "react-native";
import Icon from "../../../../../../../common/atoms/icon";
import { FloorAdditorProps } from "../types";

export default function FloorAdditor({ styles, onPress }: FloorAdditorProps) {
    return (
        <View style={styles.rowContaier}>
            <TouchableOpacity style={styles.floorBox} activeOpacity={0.5} onPress={() => onPress()}>
                <Icon name="plus" size={styles.addtionIcon.width} color={styles.addtionIcon.color} />
            </TouchableOpacity>
            <View style={styles.roomBox} />
            <View style={styles.blankBox} />
        </View>
    );
}
