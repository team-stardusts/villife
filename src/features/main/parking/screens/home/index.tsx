import { ScrollView } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ParkingScreenProps from "./types";
import useParkService from "../../services/park";
import { useEffect, useState } from "react";
import VehicleCardView from "./card";
import useStyler from "../../../../common/hooks/styler/hooks";
import useParkingHomeScreenStyles from "./styles";
import { Vehicle } from "../../services/states/types";
import { useRecoilValue } from "recoil";
import { vehiclesState } from "../../services/states";
import useUserInformation from "../../../../common/hooks/service/user_info";
import VehicleListView from "./list";

export default function ParkingScreen({ navigation, route }: ParkingScreenProps) {
    const messages = useScreenMessage();
    const user = useUserInformation();
    const styles = useParkingHomeScreenStyles();
    const { updateVehicles } = useParkService();
    const vehicles = useRecoilValue<Vehicle[]>(vehiclesState);
    const [vehiclesForRender, setVehiclesForRender] = useState<Vehicle[]>([]);

    useEffect(() => {
        updateVehicles();
    }, []);

    useEffect(() => {
        sortAndSetVehiclesForRender();
    }, [vehicles]);

    const sortAndSetVehiclesForRender = (): void => {
        const newVehiclesForRender: Vehicle[] = [];

        if (user?.isAdmin) {
            newVehiclesForRender.push(...vehicles);
        } else {
            newVehiclesForRender.push(...vehicles.filter((vehicle) => vehicle.ownerType !== "user"));
        }

        newVehiclesForRender
            // 차량번호 1 -> 2
            .sort((vehicleA, vehicleB) => {
                try {
                    return parseInt(vehicleA.plate_number.slice(0, 2)) - parseInt(vehicleB.plate_number.slice(0, 2));
                } catch {
                    return 0;
                }
            })
            // 방문자 -> 거주자
            .sort((vehicleA, vehicleB) => {
                if ("visiting_purpose" in vehicleA && "visiting_purpose" in vehicleB) {
                    return 0;
                } else if ("visiting_purpose" in vehicleA) {
                    return -1;
                }

                return 1;
            });

        setVehiclesForRender(newVehiclesForRender);
    };

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
                {!user?.isAdmin && (
                    <VehicleCardView vehicles={vehicles.filter((vehicle) => vehicle.ownerType === "user")} />
                )}
                <VehicleListView vehicles={vehiclesForRender} />
            </ScrollView>
        </NavigationView>
    );
}
