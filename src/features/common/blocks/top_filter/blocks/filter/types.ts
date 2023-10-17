import { Filter, ScreenTopFilterProps } from "../../types";

export type FilterProps = Filter<any> & {
    data: ScreenTopFilterProps["data"];
    onFilterData: ScreenTopFilterProps["onFilterData"];
    filterStyle: ScreenTopFilterProps["filterStyle"];
    style: ScreenTopFilterProps["style"];
};

export type UseFilterStylesProps = {
    filterStyle: FilterProps["filterStyle"];
    style: FilterProps["style"];
};
