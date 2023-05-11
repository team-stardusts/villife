import { StyleSheet, Text, View } from "react-native";
import { ContentLableProps } from "./type";
import ContentLableStyle from "./style";

function NotiLable(props: ContentLableProps) {
    switch (props.priority) {
        case 1:
            return (
                <View style={[ContentLableStyle.container, { backgroundColor: "red" }]}>
                    <Text style={ContentLableStyle.textStyle}>필독</Text>
                </View>
            );
        case 2:
            return (
                <View style={[ContentLableStyle.container, { backgroundColor: "green" }]}>
                    <Text style={ContentLableStyle.textStyle}>레벨2</Text>
                </View>
            );
        case 3:
            return (
                <View style={[ContentLableStyle.container, { backgroundColor: "#7C7C7C" }]}>
                    <Text style={ContentLableStyle.textStyle}>일반</Text>
                </View>
            );

        default:
            return <></>;
    }
}

export default NotiLable;
