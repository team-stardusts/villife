import { View } from "react-native";
import useFilterStyles from "./styles";
import { FilterProps } from "./types";
import HorizontalFilter from "./nodes";

export default function Filter(props: FilterProps) {
    const styles = useFilterStyles({ ...props });
    return (
        <View style={styles.main.container}>
            <HorizontalFilter
                styles={styles.nodes}
                headers={props.headers}
                postfix={props?.postfix}
                onChangeSelectedItems={console.log}
                enableSelectAll={props.enableSelectAll}
            />
        </View>
    );
}
