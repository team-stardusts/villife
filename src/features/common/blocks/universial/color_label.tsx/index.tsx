import { Text, View } from "react-native";
import { ContentLableProps } from "./type";
import useColorLableStyle from "./style";

export default function ColorLable(props: ContentLableProps) {
    const styles = useColorLableStyle();

    return (
        <View style={[styles.containerRed, { backgroundColor: props.backgroundColor }]}>
            <Text style={[styles.textStyle, { color: props.textColor }]}>{props.text}</Text>
        </View>
    );
}
