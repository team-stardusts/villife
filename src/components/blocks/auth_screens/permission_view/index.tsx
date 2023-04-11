import { View, Text } from "react-native";
import useAuthScreenTtitleViewStyles from "./styles";
import PermissionScreenViewProps from "./types";
import PressablePermissionIcon from "../../icon/permission";

export default function PermissionScreenView(props: PermissionScreenViewProps): JSX.Element {
    const Styles = useAuthScreenTtitleViewStyles();
    const { title, subtitle } = props;

    return (
        <View style={Styles.topLevelBox}>
            <View style={Styles.textWrapper}>
                <PressablePermissionIcon providerName="phoneIcon" diameter={100} />
            </View>
            <View>
                <Text>{title}</Text>
                <Text>{subtitle}</Text>
            </View>
        </View>
    );
}
