import { StyleSheet, Text, View } from "react-native";
import { ContentLableProps } from "./type";
import ContentLableStyle from "./style";

function ApprovalLable(props: ContentLableProps) {
    return (
        <View style={[ContentLableStyle.container, { backgroundColor: "red" }]}>
            <Text style={ContentLableStyle.textStyle}>{props.building_name}</Text>
        </View>
    );
}

export default ApprovalLable;
