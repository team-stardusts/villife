import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "../../../../../../common/atoms/icon";
import { LayoutSelectorProps } from "./types";
import useLayoutSelectorStyles from "./styles";

export default function LayoutSelector(props: LayoutSelectorProps) {
    const styles = useLayoutSelectorStyles();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.pressable}
                onPress={() => {
                    props.onSelect(props.layout === "list" ? "matrix" : "list");
                }}>
                <Icon
                    name={props.layout === "list" ? "matrix" : "list"}
                    size={styles.selectedIcon.width}
                    color={styles.selectedIcon.color}
                />
            </TouchableOpacity>
        </View>
    );
}
