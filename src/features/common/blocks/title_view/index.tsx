import { View, Text } from "react-native";
import useScreenTtitleViewStyles from "./styles";
import ScreenTitleViewProps from "./types";
import ScreenBottonButton from "./bottom_button";

export default function ScreenTitleView(props: ScreenTitleViewProps): JSX.Element {
    const styles = useScreenTtitleViewStyles(props.disablePaddingTop);

    return (
        <View style={[styles.container]}>
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
            {props.bottomButton && (
                <View style={styles.btnBox}>
                    <ScreenBottonButton {...props.bottomButton} />
                </View>
            )}
        </View>
    );
}
