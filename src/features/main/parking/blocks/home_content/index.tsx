import { Alert, Text, TouchableOpacity, View } from "react-native";
import MiniContent from "../../../../common/blocks/mini_content";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useHomeContentFromParkingStyles from "./styles";
import { useEffect, useState } from "react";
import { IconSeries } from "../../../../common/atoms/icon/types";
import Icon from "../../../../common/atoms/icon";
import { RouterParams } from "../../../../common/router/types";
import { useNavigation } from "@react-navigation/native";
import useParkService from "../../services/park";
import { Vehicle } from "../../services/states/types";
import VehicleModifyModal from "../modify_modal";
import { PRESSABLE_MENU_TYPE, PressableMenuProps } from "./types";
import { useRecoilValue } from "recoil";
import { vehiclesState } from "../../services/states";

export default function HomeContentFromParking({ backgroundColor }: { backgroundColor: string }) {
    const messages = useScreenMessage().messages;
    const [favoritVehicle, setFavoriteVehicle] = useState<Vehicle | null>(null);
    const styles = useHomeContentFromParkingStyles(favoritVehicle !== null);
    const vehicles = useRecoilValue<Vehicle[]>(vehiclesState);
    const updateVehicles = useParkService().updateVehicles;

    const setFavoriteVehicleFromVehicles = async (): Promise<void> => {
        const userVehicles = vehicles.filter((vehicle) => vehicle.ownerType === "user");
        if (userVehicles.length === 0) {
            return;
        }

        // [TO-DO] 차량 즐겨찾기 기능을 추가하여 즐겨찾는 차량이 선택되도록 변경해야함
        setFavoriteVehicle(userVehicles[0]);
    };

    useEffect(() => {
        setFavoriteVehicleFromVehicles();
    }, [vehicles]);

    useEffect(() => {
        updateVehicles("user");
    }, []);

    return (
        <MiniContent title={messages.main.parking.home_content.screen_title} backgroundColor={backgroundColor}>
            <View style={styles.main.container}>
                {favoritVehicle && (
                    <View style={styles.main.textBox}>
                        <View style={styles.main.printWrapper}>
                            <Text style={styles.main.text}>
                                {messages.main.parking.home_content.estimated_time_of_departure}
                            </Text>
                        </View>
                        <View style={styles.main.dateWrapper}>
                            <Text style={styles.main.text}>
                                {favoritVehicle.etd.getHours()}
                                {messages.words.hour} {favoritVehicle.etd.getMinutes()}
                                {messages.words.minute}
                            </Text>
                        </View>
                    </View>
                )}
                <View style={styles.main.btnBox}>
                    {Object.values(PRESSABLE_MENU_TYPE).map((value, index) => (
                        <PressableMenu
                            key={index}
                            type={value}
                            styles={styles.menu}
                            vehicle={favoritVehicle}
                            messages={messages.main.parking.home_content}
                        />
                    ))}
                </View>
            </View>
        </MiniContent>
    );
}

function PressableMenu({ type, styles, vehicle, messages }: PressableMenuProps) {
    const navigation = useNavigation<RouterParams["navigation"]>();
    const [text, setText] = useState<string>("");
    const [iconName, setIconName] = useState<IconSeries>("people-round");
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        switch (type) {
            case "vehicle_list":
                setText(messages.vehicle_list);
                setIconName("list");
                return;
            case "register_guest":
                setText(messages.register_guest_vehicle);
                setIconName("people-round");
                return;
            default:
                setText(messages.departure_management);
                setIconName("parking-lot");
                return;
        }
    }, []);

    const handlePress = () => {
        switch (type) {
            case "vehicle_list":
                navigation.reset({
                    index: 0,
                    routes: [{ name: "parking", params: {} }],
                });
                return;
            case "register_guest":
                navigation.push("register_guest_vehicle", {});
                return;
            default:
                if (vehicle === null) Alert.alert(messages.no_registed_vehicle);
                else setVisible(true);
        }
    };

    return (
        <>
            <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={handlePress}>
                <View style={styles.iconBox}>
                    <Icon name={iconName} size={styles.icon.width} color={styles.icon.color} />
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.text} numberOfLines={2}>
                        {text}
                    </Text>
                </View>
            </TouchableOpacity>
            {vehicle !== null && (
                <VehicleModifyModal modalVisible={visible} setModalVisible={setVisible} initialVehicleInfo={vehicle} />
            )}
        </>
    );
}
