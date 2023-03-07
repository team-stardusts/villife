import { View, Text } from "react-native";
import useAuthScreenTtitleViewStyles from "./styles";
import AuthScreenTitleViewProps from "./types";


export default function AuthScreenTitleView(
    props: AuthScreenTitleViewProps): JSX.Element {
    const Styles = useAuthScreenTtitleViewStyles();

    return (
        <View style={Styles.topLevelBox}>
            <View style={Styles.textWrapper}>
                <Text style={Styles.title}>
                    {props.title}
                </Text>
                {
                    props.subtitles 
                    ? props.subtitles.map((value, index) => (
                        <Text key={index} style={Styles.subtitle}>
                            {value}
                        </Text>
                    ))
                    : <></>
                }
            </View>
        </View>
    )
}