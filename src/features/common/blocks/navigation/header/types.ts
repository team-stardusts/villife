import { FunctionComponent } from "react";
import { ColorValue } from "react-native";

export type NavigationViewHeaderProps = {
    title: string;
    hideBuidingSelector?: boolean;
    navComponent?: FunctionComponent<any>;
    navComponentProps?: {
        [key: string]: any;
    };
    style?: {
        borderBottomColor?: ColorValue;
        backgroundColor?: ColorValue;
    };
};
