import React from "react";
import { IconSeries } from "../../atoms/icon/types";
import { VillifeRootStackParamList } from "../../router/types";
import { NavigationViewHeaderProps } from "./header/types";

export type HeaderOptions = NavigationViewHeaderProps & {
    shown?: boolean;
};

export type BodyOptions = {
    applyDefaultHorizontalPadding?: boolean;
    applyDefaultVerticalPadding?: boolean;
};

export type BottomNavigationOptions = {
    shown?: boolean;
};

/* export type NavigationViewStylesProps = {
    isPressingMenuBtn: boolean;
}; */

export type RootLink = {
    icon: IconSeries;
    caption: string;
    screen: {
        name: keyof VillifeRootStackParamList;
        params: VillifeRootStackParamList[RootLink["screen"]["name"]];
    };
};

type NavigationViewProps = {
    headerOptions: HeaderOptions;
    bodyOptions?: BodyOptions;
    bottomNavOptions?: BottomNavigationOptions;
    children: React.ReactNode;
};

export default NavigationViewProps;
