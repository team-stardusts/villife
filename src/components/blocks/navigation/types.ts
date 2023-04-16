import React, { FunctionComponent } from "react";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { IconSeries } from "../../atoms/icon/types";
import { StackParamList } from "../../router/types";

export type HeaderOptions = {
    title: string;
    shown?: boolean;
    navComponent?: FunctionComponent<any>;
    navComponentProps?: {
        [key: string]: any;
    };
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
        name: keyof StackParamList;
        params: StackParamList[BottomLink["screen"]["name"]];
    };
};

type NavigationViewProps = {
    headerOptions: HeaderOptions;
    bottomNavOptions?: BottomNavigationOptions;
    children: React.ReactNode;
};

export default NavigationViewProps;
