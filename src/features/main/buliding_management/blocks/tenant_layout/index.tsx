import { View } from "react-native";
import { TentantLayoutProps } from "./types";
import useTentantLayoutStyles from "./styles";
import BuildingTenantListView from "./list";

export default function TentantLayout(props: TentantLayoutProps) {
    const styles = useTentantLayoutStyles();
    return (
        <View style={styles.container}>{props.layout === "list" ? <BuildingTenantListView {...props} /> : <></>}</View>
    );
}
