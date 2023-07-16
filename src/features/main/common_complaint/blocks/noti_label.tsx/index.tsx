import { StyleSheet, Text, View } from "react-native";
import { ContentLableProps } from "./type";
import ContentLableStyle from "./style";
import useNotiLableStyles from "./style";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";

export default function NotiLable(props: ContentLableProps) {
    const styles = useNotiLableStyles();
    const message = useScreenMessage();

    switch (props.priority) {
        case 1:
            return (
                <View style={styles.containerRed}>
                    <Text style={styles.textStyle}>{message.messages.main.noti.required_reading}</Text>
                </View>
            );
        case 2:
            return (
                <View style={styles.containerGreen}>
                    <Text style={styles.textStyle}>{message.messages.main.noti.important_reading}</Text>
                </View>
            );
        case 3:
            return (
                <View style={styles.containerGray}>
                    <Text style={styles.textStyle}>{message.messages.main.noti.reading}</Text>
                </View>
            );

        default:
            return <></>;
    }
}
