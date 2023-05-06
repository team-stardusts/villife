import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ParkingScreenProps from "./type";
import useParkService from "../../services/park";
import { useEffect, useState } from "react";
import { GuestVehicle, TenantVehicle } from "../../../../../libs/rest_apis/villife/parking/types";
import VehicleCardView from "../../blocks/vehicle_card";
import useStyler from "../../../../common/hooks/styler/hooks";
import { SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE } from "../../../../common/constants";
import useParkingHomeScreenStyles from "./styles";
import Badge from "../../../../common/atoms/badge";
import ContentBox from "../../../../common/blocks/content_box";
import Icon from "../../../../common/atoms/icon";

type Vehicles = {
    myVehicles: TenantVehicle[];
    vehicles: TenantVehicle[];
    guestVehicles: GuestVehicle[];
};

type VehicleInfoProps = {
    ownerType: "guest" | "tenant";
    plateNumber: string;
    phoneNumber: string;
    etd: number;
};

function VehicleInfo({ ownerType, plateNumber, phoneNumber, etd }: VehicleInfoProps) {
    const styles = useParkingHomeScreenStyles().vehicleInfo;
    const message = useScreenMessage();
    const badgeTitle =
        ownerType === "tenant" ? message.messages.main.parking.home.tenant : message.messages.main.parking.home.guest;
    const badgeStyle = ownerType === "tenant" ? styles.tenantBadge : styles.guestBadge;

    return (
        <View style={styles.toplevelBox}>
            <ContentBox>
                <View style={styles.contentBox}>
                    <View style={styles.vehicleInfoBox}>
                        <Badge
                            title={badgeTitle}
                            size={badgeStyle.width}
                            color={badgeStyle.color}
                            bgColor={badgeStyle.backgroundColor}
                        />
                        <Text style={styles.plateNumber}>{plateNumber}</Text>
                    </View>
                    <View style={styles.communicationFuncBox}>
                        <TouchableOpacity activeOpacity={0.6} style={styles.communicationIconBox}>
                            <Icon name="phone" size={styles.phoneIcon.width} color={styles.phoneIcon.color} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6} style={styles.communicationIconBox}>
                            <Icon name="letter" size={styles.letterIcon.width} color={styles.letterIcon.color} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoBox}></View>
                </View>
            </ContentBox>
        </View>
    );
}

export default function ParkingScreen({ navigation, route }: ParkingScreenProps) {
    const messages = useScreenMessage();
    const parkService = useParkService();
    const { deviceUI, theme } = useStyler();
    const styles = useParkingHomeScreenStyles().screen;
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
                title: messages.messages.main.parking.home.screen_title,
            }}>
            <View style={styles.toplevelBox}>
                <View style={styles.myVehicleCardViewBox}>
                    <Text style={styles.contentTitle}>{messages.messages.main.parking.home.my_vehicle_info}</Text>
                    <VehicleCardView vehicles={vehicles.myVehicles} cardWidth={cardWidth} />
                </View>
                <View style={styles.buildingVehiclesViewBox}>
                    <Text style={styles.contentTitle}>{messages.messages.main.parking.home.villa_vehicle_info}</Text>
                    <ScrollView>
                        {vehicles.guestVehicles.map((vehicle, index) => (
                            <VehicleInfo
                                key={index}
                                ownerType="guest"
                                plateNumber={vehicle.plate_number}
                                phoneNumber={vehicle.phone_number}
                                etd={vehicle.etd}
                            />
                        ))}
                        {vehicles.vehicles.map((vehicle, index) => {
                            // 차량 리스트에서 나의 차량을 제외하기 위함.
                            const myVehicles = vehicles.myVehicles.find((myVehicle) => myVehicle.id === vehicle.id);

                            if (myVehicles !== undefined) {
                                return;
                            }

                            return (
                                <VehicleInfo
                                    key={index}
                                    ownerType="tenant"
                                    plateNumber={vehicle.plate_number}
                                    phoneNumber={vehicle.phone_number}
                                    etd={vehicle.etd}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
            </View>
        </NavigationView>
    );
}
