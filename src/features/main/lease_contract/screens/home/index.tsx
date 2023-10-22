import { View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import LeaseContractHomeScreenProps from "./types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useBuildingManagementScreenStyles from "./styles";
import BuildingTentantMessage from "../../blocks/message";
import BuildingTenantFilter from "../../blocks/filter";
import { useState } from "react";
import TentantLayout from "../../blocks/tenant_layout";
import { BuildingRoomInfo } from "../../services/building_rooms/provider/types";
import { LayoutType } from "../../blocks/filter/blocks/layout/types";

export default function LeaseContractHomeScreen({ navigation, route }: LeaseContractHomeScreenProps) {
    const messages = useScreenMessage().messages;
    const styles = useBuildingManagementScreenStyles();
    const [layout, setLayout] = useState<LayoutType>("list");
    const [roomInfos, setRoomInfos] = useState<BuildingRoomInfo[]>([]);
    console.log("[BUILDING_MANAGEMENT_SCREEN]", "On Create");

    return (
        <NavigationView
            headerOptions={{
                title: messages.main.lease_contract.home.screen_title,
                style: {
                    backgroundColor: styles.nav.backgroundColor,
                },
                navComponent: BuildingTentantMessage,
                navComponentProps: {
                    onPress: () => {
                        navigation.navigate("send_message_to_building_tenants", {
                            layout,
                            tenants: JSON.stringify(roomInfos),
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
                    <BuildingTenantFilter onFilterChange={setRoomInfos} onLayoutChange={setLayout} />
                </View>
                <View style={styles.listView}>
                    <TentantLayout layout={layout} roomInfos={roomInfos} checkmode={false} />
                </View>
            </View>
        </NavigationView>
    );
}
