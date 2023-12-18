import { ScrollView } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ParkingScreenProps from "./types";
import { useEffect, useMemo } from "react";
import VehicleCardView from "./card";
import useParkingHomeScreenStyles from "./styles";
import VehicleListView from "./list";
import InfoPannel from "../../../../common/blocks/info-pannel";
import useParkingViewmodel from "../../viewmodel";
import { Vehicle } from "../../viewmodel/types";

export default function ParkingSrcreen({ navigation, route }: ParkingScreenProps) {
    const messages = useScreenMessage();
    const styles = useParkingHomeScreenStyles();
    const viewModel = useParkingViewmodel();
    const vehicles = useMemo<Vehicle[]>(() => {
        if (viewModel === null) return [];

        return viewModel.data;
    }, [viewModel?.data]);

    useEffect(() => {
        console.log("ParkingHome");
        viewModel?.update();
    }, [viewModel?.user?.adminInfomation?.selectedBuilding]);

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.parking.home.screen_title,
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: true,
                applyDefaultVerticalPadding: false,
            }}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {!viewModel?.user?.isAdmin && (
                    <>
                        <InfoPannel
                            infos={[
                                {
                                    type: "info",
                                    message: "등록한 차량은 관리자 승인 이후 반영돼요!",
                                },
                                {
                                    type: "info",
                                    message: "차량 입차/출차 시간은 참고용 시간이에요.",
                                },
                                {
                                    type: "info",
                                    message: "이중주차를 하셨나요? 알림 메세지를 보내보세요!",
                                },
                            ]}
                        />
                        <VehicleCardView
                            vehicles={vehicles.filter((v) => v.ownerType === "user")}
                            requestedVehicles={viewModel?.requestedVehicles ?? []}
                            viewModel={viewModel}
                        />
                    </>
                )}
                <VehicleListView vehicles={vehicles} />
            </ScrollView>
        </NavigationView>
    );
}
