import { GestureResponderEvent } from "react-native";
import { IconSeries } from "../../../../atoms/icon/types";

export type SimpleNavComponentProps = {
    iconName?: IconSeries;
    title: string;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
};
