import { ScrollView } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ParkingScreenProps from "./types";
import useParkingLot from "../../services/parking_lot";
import { useCallback, useEffect } from "react";
import VehicleCardView from "./card";
import useParkingHomeScreenStyles from "./styles";
import { Vehicle } from "../../services/states/types";
import useUserInformation from "../../../../common/hooks/service/user_info";
import VehicleListView from "./list";
import InfoPannel from "../../../../common/blocks/info-pannel";

export default function ParkingScreen({ navigation, route }: ParkingScreenProps) {
    const messages = useScreenMessage();
    const styles = useParkingHomeScreenStyles();
    const user = useUserInformation();
    const parkingLot = useParkingLot();

    useEffect(() => {
        parkingLot.updateVehicles();
    }, [user?.adminInfomation?.selectedBuilding]);

    useEffect(() => {
        sortAndSetVehiclesForRender();
    }, [parkingLot.vehicles]);

    const sortAndSetVehiclesForRender = useCallback((): Vehicle[] => {
        const newVehiclesForRender: Vehicle[] = [];

        if (user?.isAdmin) {
            newVehiclesForRender.push(...parkingLot.vehicles);
        } else {
            newVehiclesForRender.push(...parkingLot.vehicles.filter((vehicle) => vehicle.ownerType !== "user"));
        }

        return (
            newVehiclesForRender
                // 차량번호 1 -> 2
                .sort((vehicleA, vehicleB) => {
                    try {
                        let _vehicleANumber = vehicleA.plate_number.split(" ")[0];
                        let _vehicleBNumber = vehicleB.plate_number.split(" ")[0];

                        _vehicleANumber = _vehicleANumber.slice(0, _vehicleANumber.length - 1);
                        _vehicleBNumber = _vehicleBNumber.slice(0, _vehicleBNumber.length - 1);

                        return parseInt(_vehicleANumber) - parseInt(_vehicleBNumber);
                    } catch {
                        return 0;
                    }
                })
                // Room number 오름차순
                .sort((vehicleA, vehicleB) => {
                    return vehicleA.room_number - vehicleB.room_number;
                })
                // 방문자 -> 거주자
                .sort((vehicleA, vehicleB) => {
                    if (vehicleA.ownerType === vehicleB.ownerType) {
                        return 0;
                    } else if (vehicleA.ownerType === "guest" && vehicleB.ownerType !== "guest") {
                        return -1;
                    }

                    return 1;
                })
        );
    }, [parkingLot.vehicles]);

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
                {!user?.isAdmin && (
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
                            vehicles={parkingLot.userVehicles}
                            requestedVehicles={parkingLot.userVehiclesNotRegisted}
                        />
                    </>
                )}
                <VehicleListView vehicles={sortAndSetVehiclesForRender()} />
            </ScrollView>
        </NavigationView>
    );
}
