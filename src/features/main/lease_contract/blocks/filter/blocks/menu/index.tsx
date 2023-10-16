import { Text, TouchableOpacity, View } from "react-native";
import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";
import { MenuProps } from "./types";

export default function Menu(props: MenuProps) {
    const messages = useScreenMessage().messages.words;

    return (
        <View style={[props.styles.menuWrapper, {}]}>
            <TouchableOpacity
                style={props.styles.menuTouchBox}
                activeOpacity={0.6}
                onPress={() => props.onMenuPress(props.type)}>
                <View
                    style={[
                        props.styles.menu,
                        {
                            borderBottomColor: props.isSelected ? props.styles.menuSelected.borderBottomColor : "",
                            borderBottomWidth: props.isSelected ? props.styles.menuSelected.borderBottomWidth : 0,
                        },
                    ]}>
                    <Text
                        style={[
                            props.styles.menuName,
                            {
                                color: props.isSelected ? props.styles.menuSelected.color : props.styles.menuName.color,
                            },
                        ]}>
                        {messages[props.type]}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
