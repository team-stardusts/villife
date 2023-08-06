import { BuildingTenant } from "../../services/types";
import { LayoutType } from "../filter/blocks/layout_selector";

export type TentantLayoutProps = {
    tenants: BuildingTenant[];
    layout: LayoutType;
    checkmode: boolean;
};
