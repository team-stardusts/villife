import { View } from "react-native";
import useFilterStyles from "./styles";
import { FilterProps } from "./types";
import HorizontalFilter from "./nodes";
import { useEffect, useState } from "react";

export default function Filter(props: FilterProps) {
    const styles = useFilterStyles({ ...props });
    const [selectedItems, setSelectedItems] = useState<string[] | null>(null);

    useEffect(() => {
        if (selectedItems === null) return;

        props.onFilterData(props.data.filter((datum) => props.filter(datum, selectedItems)));
    }, [selectedItems, props.data]);

    return (
        <View style={styles.main.container}>
            <HorizontalFilter
                styles={styles.nodes}
                headers={props.conditions}
                postfix={props?.postfix}
                onChangeSelectedItems={setSelectedItems}
                enableSelectAll={props.enableSelectAll}
                disableMultipleSelection={props.disableMultipleSelection ? true : false}
            />
        </View>
    );
}
