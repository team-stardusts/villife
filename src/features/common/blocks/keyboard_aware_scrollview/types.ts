import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export type KeyboardAwareScrollViewProps = {
    style?: StyleProp<ViewStyle>;
    children: ReactNode;
    touchedCoordinateY?: number;
};
