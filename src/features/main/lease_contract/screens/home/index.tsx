import { Alert, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import LeaseContractHomeScreenProps from "./types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useBuildingManagementScreenStyles from "./styles";
import BuildingTentantMessage from "../../blocks/message";
import { useEffect, useState } from "react";
import TentantLayout from "../../blocks/tenant_layout";
import { BuildingRoomInfo } from "../../services/building_rooms/provider/types";
import useUserInformation from "../../../../common/hooks/service/user_info";
import useBuildingRoomContractor from "../../services/building_rooms";
import ScreenTopFilter from "../../../../common/blocks/top_filter";
import leaseFilter from "./filter";
import { Filter } from "../../../../common/blocks/top_filter/types";
import { LayoutType } from "./blocks/layout/types";
import LayoutSelector from "./blocks/layout";

export default function LeaseContractHomeScreen({ navigation, route }: LeaseContractHomeScreenProps) {
    const messages = useScreenMessage().messages;
    const styles = useBuildingManagementScreenStyles();
    const user = useUserInformation();
    const contractor = useBuildingRoomContractor();
    const [layout, setLayout] = useState<LayoutType>("list");
    const [filters, setFilters] = useState<Filter<BuildingRoomInfo>[]>([...leaseFilter]);
    const [filteredRoomInfos, setFilteredRoomInfo] = useState<BuildingRoomInfo[]>([]);
    console.log("[BUILDING_MANAGEMENT_SCREEN]", "On Create");

    useEffect(() => {
        if (!user?.adminInfomation?.selectedBuilding) return;

        contractor.updateRooms();
    }, [user?.adminInfomation?.selectedBuilding]);

    useEffect(() => {
        setFilterFloors();
    }, [contractor.rooms]);

    const setFilterFloors = () => {
        let floors = contractor.rooms.map((r) => r.floor.toString());

        // 중복 제거
        floors = floors
            .filter((f, i) => {
                return floors.indexOf(f) === i;
            })
            .sort();

        const floorFilterIndex = filters.findIndex((f) => f.name === "층");

        if (floorFilterIndex === -1) {
            Alert.alert("필터에서 예기치 않은 문제가 발생했습니다.");
            navigation.reset({ index: 0, routes: [{ name: "home" }] });
        }

        const _filter = [...filters];
        _filter[floorFilterIndex].conditions = floors;

        setFilters([..._filter]);
    };

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
                            tenants: JSON.stringify(filteredRoomInfos),
                        });
                    },
                },
            }}
            bodyOptions={{
                backgroundColor: styles.nav.backgroundColor,
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}>
            <ScreenTopFilter
                style={styles.filterBase}
                filterStyle={{
                    selectedBorderColor: styles.selectedFilter.borderColor,
                    selectedBackgroundColor: styles.selectedFilter.backgroundColor,
                    backgroundColor: styles.filter.backgroundColor,
                }}
                data={contractor.rooms}
                onFilterData={(data: BuildingRoomInfo[]) => {
                    const _filteredHistory = data.sort((a, b) => {
                        if (a.roomNumber > b.roomNumber) return 1;
                        if (a.roomNumber === b.roomNumber) return 0;
                        return -1;
                    });

                    setFilteredRoomInfo([..._filteredHistory]);
                }}
                filters={filters}
                sideComponent={() => <LayoutSelector layout={layout} onSelect={setLayout} />}
            />
            <View style={styles.container}>
                <View style={styles.listView}>
                    <TentantLayout layout={layout} roomInfos={filteredRoomInfos} checkmode={false} />
                </View>
            </View>
        </NavigationView>
    );
}
