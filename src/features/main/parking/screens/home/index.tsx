import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ParkingScreenProps from "./types";
import useParkService from "../../services/park";
import { useEffect, useState } from "react";
import { Parking } from "../../../../../libs/rest_apis/villife/parking/types";
import VehicleCardView from "../../blocks/vehicle_card";
import useStyler from "../../../../common/hooks/styler/hooks";
import { SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE } from "../../../../common/constants";
import useParkingHomeScreenStyles from "./styles";
import Badge from "../../../../common/atoms/badge";
import ContentBox from "../../../../common/blocks/content_box";
import Icon from "../../../../common/atoms/icon";
import SimpleFuncButton from "../../../../common/blocks/button/simple_func_button";
import { Vehicle } from "../../services/park/types";

type VehicleInfoProps = {
    ownerType: "guest" | "tenant";
    plateNumber: string;
    phoneNumber: string;
    etd: Date;
};

function VehicleInfo({ ownerType, plateNumber, phoneNumber, etd }: VehicleInfoProps) {
    const styles = useParkingHomeScreenStyles().vehicleInfo;
    const message = useScreenMessage();
    const badgeTitle = ownerType === "tenant" ? message.messages.words.tenant : message.messages.words.guest;
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
    const { vehicles } = useParkService();
    const { deviceUI } = useStyler();
    const styles = useParkingHomeScreenStyles().screen;
    const screenPadding: number = deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE);

    // Card에서 ScrollView를 사용하므로, 가변적인 카드를 만들기 위해서 Width 지정이 필요함
    const cardWidth: number = deviceUI.screenSize.width - (screenPadding + deviceUI.moderateScale(20));

    // Vehicles 목록을 딜레이를 줘서 렌더링하기 위함.
    const [vehiclesForRendering, setVehiclesForRendering] = useState<Vehicle[]>([]);

    // Vehicles 목록을 딜레이를 줘서 렌더링하기 위함.
    const renderVehicleInfos = async () => {
        const delay: number = 50;
        const allVehicles: Vehicle[] = [...vehicles.guestVehicles, ...vehicles.vehicles];

        for (let i = 0; i < allVehicles.length; i++) {
            // 차량 리스트에서 나의 차량을 제외하기 위함.
            const myVehicles = vehicles.myVehicles.find(
                (vehicle) => vehicle.plate_number === allVehicles[i].plate_number
            );

            if (myVehicles !== undefined) continue;

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve("");
                }, delay)
            );

            setVehiclesForRendering((prevData) => {
                const newData = [...prevData];
                newData[i] = allVehicles[i];
                return newData;
            });
        }
    };

    useEffect(() => {
        renderVehicleInfos();
    }, [vehicles]);

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.parking.home.screen_title,
            }}>
            <View style={styles.toplevelBox}>
                <View style={styles.myVehicleCardViewBox}>
                    <View style={styles.contentTitleBox}>
                        <Text style={styles.contentTitle}>{messages.messages.main.parking.home.my_vehicle_info}</Text>
                        {/* <View style={styles.contentFuncButtonBox}>
                            <SimpleFuncButton
                                icon={{ name: "pencil", size: styles.contentFuncButtonIcon.width }}
                                title={messages.messages.words.modify}
                            />
                        </View> */}
                    </View>
                    <VehicleCardView
                        vehicles={vehicles?.myVehicles !== undefined ? vehicles.myVehicles : []}
                        cardWidth={cardWidth}
                    />
                </View>
                <View style={styles.buildingVehiclesViewBox}>
                    <View style={styles.contentTitleBox}>
                        <Text style={styles.contentTitle}>
                            {messages.messages.main.parking.home.villa_vehicle_info}
                        </Text>
                        <View style={styles.contentFuncButtonBox}>
                            <SimpleFuncButton
                                icon={{ name: "plus", size: styles.contentFuncButtonIcon.width }}
                                title={messages.messages.main.parking.home.register_guest}
                                onPress={() => {
                                    navigation.navigate("register_guest_vehicle");
                                }}
                            />
                        </View>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {vehiclesForRendering.map((vehicle, index) => {
                            if (vehicle === undefined) return;

                            let ownerType: VehicleInfoProps["ownerType"] = "tenant";

                            if ("visiting_perpose" in vehicle) {
                                ownerType = "guest";
                            }

                            return (
                                <VehicleInfo
                                    key={index}
                                    ownerType={ownerType}
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
