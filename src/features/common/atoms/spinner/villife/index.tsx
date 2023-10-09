import { ColorValue, View } from "react-native";
import Spinner from "..";
import Icon from "../../icon";
import useStyler from "../../../hooks/styler/hooks";

export default function VillifeSpinner(props: VillifeSpinnerProps) {
    const { deviceUI, theme } = useStyler();

    return (
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
            }}>
            <View
                style={{
                    position: "absolute",
                    height: props.size ?? deviceUI.moderateScale(100),
                    width: props.size ?? deviceUI.moderateScale(100),
                }}>
                <Spinner
                    size={props.size ?? deviceUI.moderateScale(100)}
                    color={props.spinnerColor ?? theme.color.specified.lightblue}
                />
            </View>
            <Icon
                name="villife"
                size={props.size ? props.size * 0.8 : deviceUI.moderateScale(80)}
                color={props.iconColor ?? theme.color.specified.blue}
            />
        </View>
    );
}

type VillifeSpinnerProps = {
    size?: number;
    iconColor?: ColorValue;
    spinnerColor?: ColorValue;
};
