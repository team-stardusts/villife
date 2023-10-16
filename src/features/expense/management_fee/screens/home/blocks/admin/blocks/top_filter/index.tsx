import { View } from "react-native";
import useScreenTopFilterStyles from "./styles";
import Menu from "./blocks/menu";
import { ScreenTopFilterProps } from "./types";
import { useState } from "react";
import HorizontalFilter from "./blocks/filter/nodes";
import Filter from "./blocks/filter";

export default function ScreenTopFilter(props: ScreenTopFilterProps) {
    const styles = useScreenTopFilterStyles();
    const [crrMenu, setCrrMenu] = useState<string | null>(null);
    //console.log(props.filters[0].filter(props.data[0], props.filters[0].headers));

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
                            <Filter key={index} {...filter} style={props.style} filterStyle={props.filterStyle} />
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
