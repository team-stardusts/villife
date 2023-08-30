import ScreenBottonButtonProps from "./bottom_button/types";

export default interface ScreenTitleViewProps {
    titles: string[];
    subtitles?: string[];
    children: React.ReactNode;
    bottomButton?: ScreenBottonButtonProps;
}
