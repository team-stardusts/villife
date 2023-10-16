import { Filter, ScreenTopFilterProps } from "../../types";

export type FilterProps = Filter<any> & {
    filterStyle: ScreenTopFilterProps["filterStyle"];
    style: ScreenTopFilterProps["style"];
};

export type UseFilterStylesProps = {
    filterStyle: FilterProps["filterStyle"];
    style: FilterProps["style"];
};
