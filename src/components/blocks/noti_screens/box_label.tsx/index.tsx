import { StyleSheet, Text, View } from "react-native";
import { ContentLableProps } from "./type";
import ContentLableStyle from "./style";

function NotiLable(props: ContentLableProps) {
    switch (props.priority) {
        case 0:
            return (
                <View style={[ContentLableStyle.container, { backgroundColor: "#EC2222" }]}>
                    <Text>{props.name}</Text>
                </View>
            );
        case 1:
            <View style={[ContentLableStyle.container, { backgroundColor: "blue" }]}>
                <Text>{props.name}</Text>
            </View>;
        case 2:
            <View style={[ContentLableStyle.container, { backgroundColor: "green" }]}>
                <Text>{props.name}</Text>
            </View>;
        case 3:
            return (
                <View style={[ContentLableStyle.container, { backgroundColor: "#7C7C7C" }]}>
                    <Text>{props.name}</Text>
                </View>
            );

        default:
            return <></>;
    }
}

export default NotiLable;
