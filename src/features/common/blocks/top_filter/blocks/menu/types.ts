import { ArrayElement, ScreenTopFilterProps } from "../../types";

export type MenuProps = {
    menus: string[];
    style: ScreenTopFilterProps["style"];
    onMenuSelection(menu: ArrayElement<MenuProps["menus"]>): void;
};
