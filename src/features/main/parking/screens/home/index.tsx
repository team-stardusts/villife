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
                        return (
                            parseInt(vehicleA.plate_number.slice(0, 2)) - parseInt(vehicleB.plate_number.slice(0, 2))
                        );
                    } catch {
                        return 0;
                    }
                })
                // 방문자 -> 거주자
                .sort((vehicleA, vehicleB) => {
                    if (vehicleA.ownerType === "guest" && vehicleB.ownerType === "guest") {
                        return 0;
                    } else if (vehicleA.ownerType === "guest") {
                        return -1;
                    }

                    return 1;
                })
        );
    }, [parkingLot.vehicles]);

    /* // Vehicles 목록을 딜레이를 줘서 렌더링하기 위함.
    const [vehiclesForRendering, setVehiclesForRendering] = useState<Vehicle[]>([]);

    // Vehicles 목록을 딜레이를 줘서 렌더링하기 위함.
    const renderVehicleInfos = useCallback(async () => {
        const delay: number = 50;
        // 차량 리스트에서 User vehicles를 제외하기 위함.
        const allVehiclesExceptUser: Vehicle[] = [...guestVehicles, ...tenantVehicles];

        if (allVehiclesExceptUser.length === 0) {
            return [];
        }

        for (let i = 0; i < allVehiclesExceptUser.length; i++) {
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve("");
                }, delay)
            );

            setVehiclesForRendering((prevData) => {
                const newData = [...prevData];
                newData[i] = allVehiclesExceptUser[i];
                return newData;
            });
        }
    }, [tenantVehicles, guestVehicles]); */

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
                {!user?.isAdmin && <VehicleCardView vehicles={parkingLot.userVehicles} />}
                <VehicleListView vehicles={sortAndSetVehiclesForRender()} />
            </ScrollView>
        </NavigationView>
    );
}
