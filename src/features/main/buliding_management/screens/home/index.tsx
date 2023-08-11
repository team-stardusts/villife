import { View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import BuildingManagementScreenProps from "./types";
import { Text } from "react-native-svg";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useBuildingManagementScreenStyles from "./styles";
import BuildingTentantMessage from "./blocks/message";
import BuildingTenantFilter from "../../blocks/filter";
import { useState } from "react";
import { BuildingTenant } from "../../services/types";
import { LayoutType } from "../../blocks/filter/blocks/layout_selector";
import TentantLayout from "../../blocks/tenant_layout";

export default function BuildingManagementScreen({ navigation, route }: BuildingManagementScreenProps) {
    const messages = useScreenMessage().messages;
    const styles = useBuildingManagementScreenStyles();
    const [layout, setLayout] = useState<LayoutType>("list");
    const [tenants, setTenants] = useState<BuildingTenant[]>([]);

    return (
        <NavigationView
            headerOptions={{
                title: messages.main.building_management.home.screen_title,
                backgroundColor: styles.nav.backgroundColor,
                navComponent: BuildingTentantMessage,
                navComponentProps: {
                    onPress: () => {
                        navigation.navigate("send_message_to_building_tenants", {
                            layout,
                            tenants: JSON.stringify(tenants),
                        });
                    },
                },
            }}
            bodyOptions={{
                backgroundColor: styles.nav.backgroundColor,
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}>
            <View style={styles.container}>
                <View style={styles.filter}>
                    <BuildingTenantFilter onFilterChange={setTenants} onLayoutChange={setLayout} />
                </View>
                <View style={styles.listView}>
                    <TentantLayout layout={layout} tenants={tenants} checkmode={false} />
                </View>
            </View>
        </NavigationView>
    );
}
