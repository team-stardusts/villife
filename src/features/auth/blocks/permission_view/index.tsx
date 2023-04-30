import { View, Text } from "react-native";
import useAuthScreenTtitleViewStyles from "./styles";
import PermissionScreenViewProps from "./types";
import PressablePermissionIcon from "../../../common/blocks/icon/permission";

export default function PermissionScreenView(props: PermissionScreenViewProps): JSX.Element {
    const Styles = useAuthScreenTtitleViewStyles();
    const { title, subtitle, providerName, diameter } = props;

    return (
        <View style={Styles.topLevelBox}>
            <View style={{}}>
                <PressablePermissionIcon providerName={providerName} diameter={diameter} />
            </View>
            <View style={{ position: "absolute", marginLeft: 60 }}>
                <Text>{title}</Text>
                <Text>{subtitle}</Text>
            </View>
        </View>
    );
}
