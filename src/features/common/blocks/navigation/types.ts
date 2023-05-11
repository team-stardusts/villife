import React, { FunctionComponent } from "react";
import { IconSeries } from "../../atoms/icon/types";
import { VillifeRootStackParamList } from "../../router/types";

export type HeaderOptions = {
    title: string;
    shown?: boolean;
    navComponent?: FunctionComponent<any>;
    navComponentProps?: {
        [key: string]: any;
    };
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

export type BottomLink = {
    icon: IconSeries;
    caption: string;
    screen: {
        name: keyof VillifeRootStackParamList;
        params: VillifeRootStackParamList[BottomLink["screen"]["name"]];
    };
};

type NavigationViewProps = {
    headerOptions: HeaderOptions;
    bodyOptions?: BodyOptions;
    bottomNavOptions?: BottomNavigationOptions;
    children: React.ReactNode;
};

export default NavigationViewProps;
