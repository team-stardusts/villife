import { ScrollView } from "react-native";
import NavigationView from "../../blocks/navigation";
import useBuildingInfoScreenStyles from "./styles";
import BuildingInfoScreenProp from "./types";
import BuildingInfoView from "./blocks/info";
import { View } from "react-native";
import useRoomViewModel from "../../../main/lease_contract/viewmodel/room";
import { useEffect, useState } from "react";
import { Villife } from "@team-stardusts/villife-client";

export default function BuildingInfoScreen({ navigation, route }: BuildingInfoScreenProp) {
    const styles = useBuildingInfoScreenStyles();
    const viewModel = useRoomViewModel();
    const [building, setBuilding] = useState<Villife.Contract.Building | null>(null);
    const [rooms, setRooms] = useState<(number | null)[]>([]);

    useEffect(() => {
        if (viewModel?.user?.isAdmin) viewModel?.update();

        viewModel?.getBuildingInfo().then(setBuilding);
    }, [viewModel?.user?.isAdmin, viewModel?.user?.adminInfomation]);

    useEffect(() => {
        if (!viewModel?.user?.isAdmin || !viewModel?.data) return;

        const _rooms: Array<number | null> = [];

        for (let roominfo of viewModel.data) {
            let floor = roominfo.floor + 1; // 반지하 추가

            if (_rooms.length < floor) {
                const delta = floor - _rooms.length;

                for (let i = 0; i < delta; i++) {
                    //console.log(i);
                    _rooms.push(null);
                }
            }

            if (typeof _rooms[roominfo.floor] === "number") {
                _rooms[roominfo.floor] = (_rooms[roominfo.floor] as number) + 1;
            } else {
                _rooms[roominfo.floor] = 1;
            }
        }

        setRooms([..._rooms]);
    }, [viewModel?.data]);

    return (
        <NavigationView
            headerOptions={{
                title: "건물 정보",
                style: {
                    backgroundColor: styles.nav.backgroundColor,
                },
            }}
            bodyOptions={{
                backgroundColor: styles.nav.backgroundColor,
                applyDefaultHorizontalPadding: true,
                applyDefaultVerticalPadding: false,
            }}
            bottomNavOptions={{
                shown: false,
            }}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {building !== null && (
                    <BuildingInfoView isAdmin={viewModel?.user?.isAdmin} buildingInfo={building} rooms={rooms} />
                )}
                <View style={styles.dummy}></View>
            </ScrollView>
        </NavigationView>
    );
}
