import { ColorValue } from "react-native";

export type ScreenTopFilterProps = {
    data: any[];
    filters: Filter<ArrayElement<ScreenTopFilterProps["data"]>>[];
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
};

export type Filter<T> = {
    name: string;
    headers: string[];
    postfix?: string;
    enableSelectAll?: boolean;
    filter: (datum: T, selectedHeaders: string[]) => boolean;
};

export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
    ? ElementType
    : never;
