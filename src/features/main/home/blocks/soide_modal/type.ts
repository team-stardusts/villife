import { ColorValue, StyleSheet } from "react-native";
import { IconSeries } from "../../../../common/atoms/icon/types";

export default interface HomeSideMoalProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export type RenderData = Array<{
    name: IconSeries;
    size: number;
    color: ColorValue;
    title: string;
    onPress: () => void;
}>;
