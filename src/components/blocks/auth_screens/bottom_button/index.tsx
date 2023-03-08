import { View } from "react-native";
import useAppTheme from "../../../../hooks/themes/hooks";
import UniversialButton from "../../universial/button";
import useAuthScreenBottomButtonStyles from "./styles";
import AuthScreenBottonButtonProps from "./types";



export default function AuthScreenBottonButton(
    props: AuthScreenBottonButtonProps): JSX.Element {
    const Styles = useAuthScreenBottomButtonStyles();
    const Theme = useAppTheme();

    return (
        <View style={Styles.topLevelBox}>
            <UniversialButton
                title={props.title}
                onPress={props.onPress}
                buttonColor={Theme.colors.colorFamily.blue}
                pressedButtonColor={Theme.colors.colorFamily.lightblue}
                disabledButtonColor={Theme.colors.colorFamily.lightgrey}
                borderRadius={0}
                disabled={props.disabled}
            />
        </View>
    )
}