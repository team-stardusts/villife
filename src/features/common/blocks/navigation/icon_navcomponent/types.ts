import { GestureResponderEvent } from "react-native";
import { IconSeries } from "../../../atoms/icon/types";

export type IconNavComponentProps = {
    iconName: IconSeries;
    caption: string;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
};
