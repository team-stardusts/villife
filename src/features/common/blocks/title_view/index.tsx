import { View, Text } from "react-native";
import useScreenTtitleViewStyles from "./styles";
import ScreenTitleViewProps from "./types";

export default function ScreenTitleView(props: ScreenTitleViewProps): JSX.Element {
    const styles = useScreenTtitleViewStyles();

    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                {props.titles.map((title, index) => (
                    <Text key={index} style={styles.title} adjustsFontSizeToFit={true} numberOfLines={1}>
                        {title}
                    </Text>
                ))}
                {props.subtitles &&
                    props.subtitles.map((value, index) => (
                        <Text key={index} style={styles.subtitle}>
                            {value}
                        </Text>
                    ))}
            </View>
            <View style={styles.children} children={props.children} />
        </View>
    );
}
