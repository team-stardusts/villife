import { Text, View } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ParkingScreenProps from "./type";
import useParkService from "../../services/park";
import { useEffect, useState } from "react";
import { GuestVehicle, TenantVehicle } from "../../../../../libs/rest_apis/villife/parking/types";
import VehicleCardView from "../../blocks/vehicle_card";
import useStyler from "../../../../common/hooks/styler/hooks";
import { SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE } from "../../../../common/constants";

type Vehicles = {
    myVehicles: TenantVehicle[];
    vehicles: TenantVehicle[];
    guestVehicles: GuestVehicle[];
};

export default function ParkingScreen({ navigation, route }: ParkingScreenProps) {
    const messages = useScreenMessage();
    const parkService = useParkService();
    const { deviceUI, theme } = useStyler();
    const screenPadding: number = deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE);
    // Card에서 ScrollView를 사용하므로, 가변적인 카드를 만들기 위해서는 Width 지정이 필요함
    const cardWidth: number = deviceUI.screenSize.width - (screenPadding + deviceUI.moderateScale(20));

    const [vehicles, setVehicles] = useState<Vehicles>({
        myVehicles: [],
        vehicles: [],
        guestVehicles: [],
    });

    const bootstrap = async () => {
        const myVehicles = await parkService.getMyVehicles();
        const vehicles = await parkService.getVehicles();
        const guestVehicles = await parkService.getGuestVehicles();

        setVehicles({
            ...vehicles,
            myVehicles,
            vehicles,
            guestVehicles,
        });
    };

    useEffect(() => {
        bootstrap();
    }, []);

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.parking.screen_title,
            }}>
            <View style={{ padding: screenPadding }}>
                <VehicleCardView title="내 차량 정보" vehicles={vehicles.myVehicles} cardWidth={cardWidth} />
            </View>
        </NavigationView>
    );
}
