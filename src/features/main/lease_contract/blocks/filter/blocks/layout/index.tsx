import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "../../../../../../common/atoms/icon";
import { LayoutSelectorProps } from "./types";

export default function LayoutSelector(props: LayoutSelectorProps) {
    return (
        <View style={props.styles.layoutSelector}>
            <TouchableOpacity
                style={props.styles.layoutSelectionBtn}
                onPress={() => {
                    props.onSelect(props.layout === "list" ? "matrix" : "list");
                }}>
                <Icon
                    name={props.layout === "list" ? "matrix" : "list"}
                    size={props.styles.layoutSelectionIconSelected.width}
                    color={props.styles.layoutSelectionIconSelected.color}
                />
            </TouchableOpacity>
        </View>
    );
}
