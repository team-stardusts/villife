import { Text, View } from "react-native";
import useStardustAlertStyles from "../styles";

type StardustAlertBodyProps = {
    message: string;
    styles: ReturnType<typeof useStardustAlertStyles>["body"];
};

export default function StardustAlertBody(props: StardustAlertBodyProps) {
    return (
        <View style={props.styles.container}>
            <Text style={props.styles.message} lineBreakMode="tail" numberOfLines={3}>
                {props.message}
            </Text>
        </View>
    );
}
