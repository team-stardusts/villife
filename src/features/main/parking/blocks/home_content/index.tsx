import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MiniContent from "../../../../common/blocks/mini_content";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useHomeContentFromParkingStyles from "./styles";
import { useEffect, useState } from "react";
import { IconSeries } from "../../../../common/atoms/icon/types";
import Icon from "../../../../common/atoms/icon";
import { RouterParams, VillifeStackParamList } from "../../../../common/router/types";
import { useNavigation } from "@react-navigation/native";
import useParkService from "../../services/park";
import { Vehicle } from "../../services/states/types";
import VehicleModifyModal from "../modify_modal";

export default function HomeContentFromParking({ backgroundColor }: { backgroundColor: string }) {
    const messages = useScreenMessage();
    const [favoritVehicle, setFavoriteVehicle] = useState<Vehicle | null>(null);
    const styles = useHomeContentFromParkingStyles(favoritVehicle !== null);
    const getVehicles = useParkService().getVehiclesByOwnerType;

    const bootstrap = async (): Promise<void> => {
        const vehicles = await getVehicles("user");

        if (vehicles.length === 0) {
            return;
        }

        // [TO-DO] 차량 즐겨찾기 기능을 추가하여 즐겨찾는 차량이 선택되도록 변경해야함
        setFavoriteVehicle(vehicles[0]);
    };

    useEffect(() => {
        bootstrap();
    }, []);

    return (
        <MiniContent title={"주차 관리"} navigation={{ to: "parking" }} backgroundColor={backgroundColor}>
            <View style={styles.main.container}>
                {favoritVehicle && (
                    <View style={styles.main.textBox}>
                        <View style={styles.main.printWrapper}>
                            <Text style={styles.main.text}>나의 출차 예정 시간</Text>
                        </View>
                        <View style={styles.main.dateWrapper}>
                            <Text style={styles.main.text}>
                                {favoritVehicle.etd.getHours()}시 {favoritVehicle.etd.getMinutes()} 분
                            </Text>
                        </View>
                    </View>
                )}
                <View style={styles.main.btnBox}>
                    {Object.values(PRESSABLE_MENU_TYPE).map((value, index) => (
                        <PressableMenu key={index} type={value} styles={styles.menu} vehicle={favoritVehicle} />
                    ))}
                </View>
            </View>
        </MiniContent>
    );
}

function PressableMenu({ type, styles, vehicle }: PressableMenuProps) {
    const navigation = useNavigation<RouterParams["navigation"]>();
    const [text, setText] = useState<string>("");
    const [iconName, setIconName] = useState<IconSeries>("people-round");
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        switch (type) {
            case "vehicle_list":
                setText("차량\n리스트");
                setIconName("list");
                return;
            case "register_guest":
                setText("방문자\n등록");
                setIconName("people-round");
                return;
            default:
                setText("출차\n관리");
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
                setVisible(true);
                return;
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
            <VehicleModifyModal modalVisible={visible} setModalVisible={setVisible} initialVehicleInfo={vehicle} />
        </>
    );
}

const PRESSABLE_MENU_TYPE = {
    VEHICLE_LIST: "vehicle_list",
    REGISTER_GUEST: "register_guest",
    VEHICLE_DEFARTURE_MANAGEMENT: "vehicle_departure_management",
} as const;

export type PressableMenuType = (typeof PRESSABLE_MENU_TYPE)[keyof typeof PRESSABLE_MENU_TYPE];

type PressableMenuProps = {
    type: PressableMenuType;
    styles: ReturnType<typeof useHomeContentFromParkingStyles>["menu"];
    vehicle: Vehicle | null;
};
