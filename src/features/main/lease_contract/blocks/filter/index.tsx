import { View } from "react-native";
import useBuildingTenantFilterStyles from "./styles";
import Menu from "./blocks/menu";
import { useEffect, useState } from "react";
import LayoutSelector from "./blocks/layout";
import { BuildingTenantFilterProps, MenuType } from "./types";
import TenantFilter from "./blocks/filter";
import useUserInformation from "../../../../common/hooks/service/user_info";

const MENUS: MenuType[] = ["floor", "contract", "status", "expiration"];

export default function BuildingTenantFilter(props: BuildingTenantFilterProps) {
    const styles = useBuildingTenantFilterStyles();
    const user = useUserInformation();
    const [crrMenu, setCrrMenu] = useState<MenuType>("floor");

    useEffect(() => {
        setCrrMenu("floor");
    }, [user?.adminInfomation?.selectedBuilding]);

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
                <View style={styles.main.filterWrapper}>
                    <TenantFilter type={crrMenu} onFilterChange={props.onFilterChange} />
                </View>
                <View style={styles.main.layoutSelectorWrapper}>
                    <LayoutSelector styles={styles.main} onSelect={props.onLayoutChange} />
                </View>
            </View>
        </View>
    );
}
