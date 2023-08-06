import { TouchableOpacity, View } from "react-native";
import useBuildingTenantFilterStyles from "./styles";
import useBuildngManagementFilterViewModel from "./view_model";
import Menu, { MenuType } from "./blocks/menu";
import { useEffect, useState } from "react";
import LayoutSelector from "./blocks/layout_selector";
import { BuildingTenant } from "../../services/types";
import { BuildingTenantFilterProps } from "./types";

const MENUS: MenuType[] = ["floor", "contract", "status", "expiration"];

export default function BuildingTenantFilter(props: BuildingTenantFilterProps) {
    const styles = useBuildingTenantFilterStyles();
    const tenants = useBuildngManagementFilterViewModel();
    const [crrMenu, setCrrMenu] = useState<MenuType>("floor");
    const [filteredTenants, setFilteredTenants] = useState<BuildingTenant[]>([]);

    useEffect(() => {
        props.onFilterChange(filteredTenants);
    }, [filteredTenants]);

    useEffect(() => {
        if (tenants.length === 0) return;
        setFilteredTenants(tenants);
    }, [tenants]);

    return (
        <View style={styles.main.container}>
            <View style={styles.main.menuContainer}>
                {MENUS.map((menu, index) => (
                    <Menu
                        key={index}
                        styles={styles.main}
                        type={menu}
                        isSelected={menu === crrMenu}
                        onMenuPress={setCrrMenu}
                    />
                ))}
            </View>
            <View style={styles.main.filterContainer}>
                <View style={styles.main.filterWrapper}></View>
                <View style={styles.main.layoutSelectorWrapper}>
                    <LayoutSelector styles={styles.main} onSelect={props.onLayoutChange} />
                </View>
            </View>
        </View>
    );
}
