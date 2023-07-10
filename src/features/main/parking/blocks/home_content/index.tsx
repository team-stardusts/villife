import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MiniContent from "../../../../common/blocks/mini_content";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useHomeContentFromParkingStyles from "./styles";
import { useEffect, useState } from "react";
import { IconSeries } from "../../../../common/atoms/icon/types";
import Icon from "../../../../common/atoms/icon";
import { RouterParams, VillifeStackParamList } from "../../../../common/router/types";
import { useNavigation } from "@react-navigation/native";

export default function HomeContentFromParking({ backgroundColor }: { backgroundColor: string }) {
    const messages = useScreenMessage();
    const styles = useHomeContentFromParkingStyles();

    return (
        <MiniContent title={"주차 관리"} navigation={{ to: "parking" }} backgroundColor={backgroundColor}>
            <View style={styles.main.container}>
                {Object.values(PRESSABLE_MENU_TYPE).map((value, index) => (
                    <PressableMenu key={index} type={value} styles={styles.menu} />
                ))}
            </View>
        </MiniContent>
    );
}

function PressableMenu({ type, styles }: PressableMenuProps) {
    const navigation = useNavigation<RouterParams["navigation"]>();
    const [text, setText] = useState<string>("");
    const [iconName, setIconName] = useState<IconSeries>("people-round");

    useEffect(() => {
        switch (type) {
            case "vehicle_list":
                setText("차량\n리스트");
                setIconName("car");
                return;
            case "register_guest":
                setText("방문자\n등록");
                setIconName("people-round");
                return;
            default:
                setText("출차\n관리");
                setIconName("speaker");
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
                navigation.reset({
                    index: 0,
                    routes: [{ name: "parking", params: {} }],
                });
                return;
        }
    };

    return (
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
};
