import { FunctionComponent } from "react";
import { ColorValue } from "react-native";

export type NavigationViewHeaderProps = {
    title: string;
    navComponent?: FunctionComponent<any>;
    navComponentProps?: {
        [key: string]: any;
    };
    backgroundColor?: ColorValue;
};
