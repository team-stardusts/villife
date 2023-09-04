import type useTitleCardViewStyles from "./styles";

export type TitleCardProps = {
    title: string;
    headerButton?: {
        title: string;
        onPress(): void;
    };
    minHeight?: number;
    children: React.ReactNode;
};

export type TitleCardHeaderProps = {
    styles: ReturnType<typeof useTitleCardViewStyles>["header"];
    title: TitleCardProps["title"];
    button?: TitleCardProps["headerButton"];
};
