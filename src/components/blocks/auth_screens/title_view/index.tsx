import { View, Text } from "react-native";
import useAuthScreenTtitleViewStyles from "./styles";
import AuthScreenTitleViewProps from "./types";

export default function AuthScreenTitleView(props: AuthScreenTitleViewProps): JSX.Element {
    const styles = useAuthScreenTtitleViewStyles();

    return (
        <View style={styles.topLevelBox}>
            <View style={styles.textWrapper}>
                <Text style={styles.title}>{props.title}</Text>
                {props.subtitles ? (
                    props.subtitles.map((value, index) => (
                        <Text key={index} style={styles.subtitle}>
                            {value}
                        </Text>
                    ))
                ) : (
                    <></>
                )}
            </View>
        </View>
    );
}
