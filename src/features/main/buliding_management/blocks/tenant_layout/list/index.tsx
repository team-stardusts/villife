import { ScrollView, Text, View } from "react-native";
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
    const selectBadgeText = () => {
        switch (props.tenant.roomState) {
            case "empty":
                return "공실";
            case "signed":
                return "가입";
            case "unsigned":
                return "미가입";
        }
    };

    return (
        <View style={props.styles.container}>
            <View style={props.styles.wrapper}>
                <View style={props.styles.infoSection}>
                    <View style={props.styles.badge}>
                        <Text>{selectBadgeText()}</Text>
                    </View>
                </View>
                <View style={props.styles.expirationNotiSection}></View>
                <View style={props.styles.functionSection}></View>
            </View>
        </View>
    );
}

type BuildingTenantProps = {
    styles: ReturnType<typeof useBuildingTenantListViewStyles>["tenant"];
    tenant: BuildingTenant;
    checkmode: boolean;
};
