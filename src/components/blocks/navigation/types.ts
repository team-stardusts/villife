import React, { FunctionComponent } from "react";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

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

/* export type useNavigationViewStylesProps = {
    headerShown: boolean;
    BottomNavShown: boolean;
}; */

type NavigationViewProps = {
    headerOptions: HeaderOptions;
    bottomNavOptions?: BottomNavigationOptions;
    children: React.ReactNode;
};

export default NavigationViewProps;
