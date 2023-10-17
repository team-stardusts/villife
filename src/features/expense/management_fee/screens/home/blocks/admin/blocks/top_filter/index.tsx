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
        <View style={styles.container}>
            <View style={styles.menu}>
                <Menu
                    menus={props.filters.map((filter) => filter.name)}
                    style={props.style}
                    onMenuSelection={setCrrMenu}
                />
            </View>
            <View style={styles.filter}>
                {props.filters.map(
                    (filter, index) =>
                        filter.name === crrMenu && (
                            <Filter
                                key={index}
                                {...filter}
                                data={props.data}
                                style={props.style}
                                filterStyle={props.filterStyle}
                                onFilterData={props.onFilterData}
                            />
                        )
                )}
            </View>
        </View>
    );
}

{
    /* <HorizontalFilter
                                key={index}
                                headers={filter.headers}
                                postfix={filter?.postfix}
                                onChangeSelectedItems={console.log}
                            /> */
}
