import { ReactElement } from "react";
import { ColorValue } from "react-native";
import { ArrayElement } from "../../global_interface";

export type ScreenTopFilterProps = {
    data: any[];
    filters: Filter<ArrayElement<ScreenTopFilterProps["data"]>>[];
    sideComponent?: () => ReactElement;
    style?: {
        borderTopColor?: ColorValue;
        borderBottomColor?: ColorValue;
        backgroundColor?: ColorValue;
    };
    filterStyle?: {
        backgroundColor?: ColorValue;
        borderColor?: ColorValue;
        selectedBackgroundColor?: ColorValue;
        selectedBorderColor?: ColorValue;
    };
    onFilterData(data: ScreenTopFilterProps["data"]): void;
};

export type Filter<T> = {
    name: string;
    conditions: string[];
    postfix?: string;
    enableSelectAll?: boolean;
    disableMultipleSelection?: boolean;
    filter: (datum: T, selectedHeaders: string[]) => boolean;
};
