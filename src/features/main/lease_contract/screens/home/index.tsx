import { Alert, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import LeaseContractHomeScreenProps from "./types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useBuildingManagementScreenStyles from "./styles";
import BuildingTentantMessage from "../../blocks/message";
import { useEffect, useState } from "react";
import TentantLayout from "../../blocks/tenant_layout";
import ScreenTopFilter from "../../../../common/blocks/top_filter";
import leaseFilter from "./filter";
import { Filter } from "../../../../common/blocks/top_filter/types";
import { LayoutType } from "./blocks/layout/types";
import LayoutSelector from "./blocks/layout";
import useRoomViewModel from "../../viewmodel/room";
import { Villife } from "@team-stardusts/villife-client";

export default function LeaseContractHomeScreen({ navigation, route }: LeaseContractHomeScreenProps) {
    const messages = useScreenMessage().messages;
    const styles = useBuildingManagementScreenStyles();
    const [layout, setLayout] = useState<LayoutType>("list");
    const [filters, setFilters] = useState<Filter<Villife.Contract.Room>[]>([...leaseFilter]);
    const [filteredRoomInfos, setFilteredRoomInfo] = useState<Villife.Contract.Room[]>([]);
    const viewmodel = useRoomViewModel();
    console.log("[BUILDING_MANAGEMENT_SCREEN]", "On Create");

    useEffect(() => {
        if (!viewmodel?.user?.adminInfomation?.selectedBuilding) return;
        viewmodel?.update();
    }, [viewmodel?.user?.isAdmin, viewmodel?.user?.adminInfomation]);

    useEffect(() => {
        if (!viewmodel?.user) return;
        setFilterFloors();
    }, [viewmodel?.data]);

    const setFilterFloors = () => {
        if (viewmodel === null) return;
        let floors = viewmodel.data.map((r) => r.floor.toString());

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
                data={viewmodel?.data ?? []}
                onFilterData={(data: Villife.Contract.Room[]) => {
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
