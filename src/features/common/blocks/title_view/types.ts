import { ColorValue } from "react-native";
import ScreenBottonButtonProps from "./bottom_button/types";

export default interface ScreenTitleViewProps {
    titles: string[];
    titleColor?: ColorValue;
    subtitles?: string[];
    disablePaddingTop?: boolean | undefined;
    children: React.ReactNode;
    bottomButton?: ScreenBottonButtonProps;
}
