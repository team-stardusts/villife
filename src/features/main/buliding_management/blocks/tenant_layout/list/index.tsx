import { ScrollView, View } from "react-native";
import useBuildingTenantListViewStyles from "./styles";
import { BuildingTenant } from "../../../services/types";
import { BuildingTenantListViewProps } from "./types";

export default function BuildingTenantListView(props: BuildingTenantListViewProps) {
    const styles = useBuildingTenantListViewStyles();

    return (
        <ScrollView style={styles.main.container}>
            {props.tenants.map((tenant, index) => (
                <BuildingTenantView key={index} styles={styles.tenant} tenant={tenant} checkmode={props.checkmode} />
            ))}
        </ScrollView>
    );
}

function BuildingTenantView(props: BuildingTenantProps) {
    return (
        <View style={props.styles.container}>
            <View style={props.styles.wrapper}></View>
        </View>
    );
}

type BuildingTenantProps = {
    styles: ReturnType<typeof useBuildingTenantListViewStyles>["tenant"];
    tenant: BuildingTenant;
    checkmode: boolean;
};
