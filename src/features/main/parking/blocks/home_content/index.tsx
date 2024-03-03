import { Alert, Text, TouchableHighlight, View } from "react-native";
import MiniContent from "../../../../common/blocks/mini_content";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useHomeContentFromParkingStyles from "./styles";
import { useEffect, useMemo, useState } from "react";
import { IconSeries } from "../../../../common/atoms/icon/types";
import Icon from "../../../../common/atoms/icon";
import { VillifeRouterParams } from "../../../../common/router/types";
import { useNavigation } from "@react-navigation/native";
import { PRESSABLE_MENU_TYPE, PressableMenuProps } from "./types";
import VehicleModifyModal from "../modal/modify";
import useParkingViewmodel from "../../viewmodel";
import { Vehicle } from "../../viewmodel/types";

export default function HomeContentFromParking() {
    const messages = useScreenMessage().messages;
    const viewModel = useParkingViewmodel();

    const favoritVehicle = useMemo<Vehicle | null>(() => {
        if (viewModel === null) return null;

        const userVehicles = viewModel.data.filter((v) => v.ownerType === "user");
        if (userVehicles.length > 0) {
            return userVehicles[0];
        }

        return null;
    }, [viewModel?.data]);

    const styles = useHomeContentFromParkingStyles(favoritVehicle !== null);

    useEffect(() => {
        if (viewModel !== null && viewModel.user.isRenter) {
            viewModel?.update();
        }
    }, []);

    return (
        <MiniContent title={messages.main.parking.home_content.screen_title} eanbleShadow={false}>
            <View style={styles.main.container}>
                {favoritVehicle && viewModel?.user?.isRenter && (
                    <View style={styles.main.textBox}>
                        <View style={styles.main.printWrapper}>
                            <Text style={styles.main.text}>
                                {messages.main.parking.home_content.estimated_time_of_departure}
                            </Text>
                        </View>
                        <View style={styles.main.dateWrapper}>
                            <Text style={styles.main.text}>
                                {favoritVehicle.etd.getUTCHours()}
                                {messages.words.hour} {favoritVehicle.etd.getUTCMinutes()}
                                {messages.words.minute}
                            </Text>
                        </View>
                    </View>
                )}
                <View style={styles.main.btnBox}>
                    {Object.values(PRESSABLE_MENU_TYPE).map((value, index) => {
                        if (viewModel?.user?.isAdmin && value === "vehicle_departure_management") {
                            return;
                        }
                        return (
                            <PressableMenu
                                key={index}
                                type={value}
                                styles={styles.menu}
                                vehicle={favoritVehicle}
                                messages={messages.main.parking.home_content}
                                viewModel={viewModel}
                            />
                        );
                    })}
                </View>
            </View>
        </MiniContent>
    );
}

function PressableMenu({ type, styles, vehicle, viewModel, messages }: PressableMenuProps) {
    const navigation = useNavigation<VillifeRouterParams["navigation"]>();
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
            <TouchableHighlight
                style={styles.container}
                underlayColor={styles.iconBoxPressed.backgroundColor}
                activeOpacity={0.7}
                onPress={handlePress}>
                <>
                    <View style={styles.iconBox}>
                        <Icon name={iconName} size={styles.icon.width} color={styles.icon.color} />
                    </View>
                    <View style={styles.textBox}>
                        <Text style={styles.text} numberOfLines={2}>
                            {text}
                        </Text>
                    </View>
                </>
            </TouchableHighlight>
            {vehicle !== null && (
                <VehicleModifyModal
                    modifyType={"etda"}
                    visible={visible}
                    setVisible={setVisible}
                    vehilce={vehicle}
                    viewModel={viewModel}
                />
            )}
        </>
    );
}
