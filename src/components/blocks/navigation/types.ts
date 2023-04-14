import { FunctionComponent } from "react";

export type HeaderOptions = {
    title: string;
    shown?: boolean;
    navComponent?: FunctionComponent;
};

export type BottomNavigationOptions = {
    shown?: boolean;
};

export type useNavigationViewStylesProps = {
    headerShown: boolean;
    BottomNavShown: boolean;
};

type NavigationViewProps = {
    headerOptions: HeaderOptions;
    bottomNavOptions?: BottomNavigationOptions;
    children: React.ReactNode;
};

export default NavigationViewProps;
