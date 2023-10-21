import { View } from "react-native";
import useScreenTopFilterStyles from "./styles";
import Menu from "./blocks/menu";
import { ScreenTopFilterProps } from "./types";
import { useState } from "react";
import Filter from "./blocks/filter";

export default function ScreenTopFilter(props: ScreenTopFilterProps) {
    const styles = useScreenTopFilterStyles();
    const [crrMenu, setCrrMenu] = useState<string | null>(null);

    return (
        <View
            style={[
                styles.container,
                props.style?.backgroundColor !== undefined && { backgroundColor: props.style.backgroundColor },
            ]}>
            <View style={styles.menu}>
                <Menu
                    menus={props.filters.map((filter) => filter.name)}
                    style={props.style}
                    onMenuSelection={setCrrMenu}
                />
            </View>
            <View
                style={[
                    styles.filter,
                    props.style?.backgroundColor !== undefined && { backgroundColor: props.style.backgroundColor },
                ]}>
                <View style={styles.filterComponent}>
                    {props.filters.map(
                        (filter, index) =>
                            filter.name === crrMenu && (
                                <Filter
                                    key={index}
                                    data={props.data}
                                    style={props.style}
                                    filterStyle={props.filterStyle}
                                    onFilterData={props.onFilterData}
                                    {...filter}
                                />
                            )
                    )}
                </View>
                {props.sideComponent && (
                    <View style={styles.sideComponent}>
                        <props.sideComponent />
                    </View>
                )}
            </View>
        </View>
    );
}
