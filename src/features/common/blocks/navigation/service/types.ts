export interface ISpaceSize {
    width: number;
    height: number;
}

export type SafetyScreenSize = {
    width: number;
    height: number;
};

export type UseNavigationViewSpaceProps = {
    isHeaderShown: boolean;
    isBottomNavShown: boolean;
    applyDefaultHorizontalPadding: boolean;
    applyDefaultVerticalPadding: boolean;
};
