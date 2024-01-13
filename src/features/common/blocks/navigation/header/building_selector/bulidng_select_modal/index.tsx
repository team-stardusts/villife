import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import BottomSlidableModal from "../../../../universial/slidemodal_bottom";
import Icon from "../../../../../atoms/icon";
import useBuildingSelectModalStyles from "./styles";
import useScreenMessage from "../../../../../hooks/multilingual/hooks";
import { useNavigation } from "@react-navigation/native";
import { VillifeRouterParams } from "../../../../../router/types";
import type { AddBuildingComponentProps, BuildingComponentProps, BuildingSelectModalProps } from "./types";
import { Villife } from "@team-stardusts/villife-client";

export default function BuildingSelectModal(props: BuildingSelectModalProps) {
    const styles = useBuildingSelectModalStyles().modal;
    const navigation = useNavigation<VillifeRouterParams["navigation"]>();

    const handleBuildingPress = (buidingInfo: Villife.User.SimpleBuildingInfo) => {
        // Modal이 너무 빠르게 닫히는 감이 있어서 100ms의 Delay를 줌.
        setTimeout(() => props.setVisible(false), 100);

        props.onBuildingPress(buidingInfo);
    };

    return (
        <BottomSlidableModal
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            height={styles.modal.maxHeight}>
            <ScrollView style={styles.container}>
                <AddBuildingComponent
                    height={styles.buildingComponent.height}
                    onPress={() => {
                        props.setVisible(false);
                        navigation.navigate("register_building");
                    }}
                />
                {props.managedBuildings &&
                    props.managedBuildings
                        .slice()
                        .sort((a, b) => {
                            if (a.name > b.name) return 1;
                            else if (a.name < b.name) return -1;
                            else return 0;
                        })
                        .map((building, index) => (
                            <BuildingComponent
                                key={index}
                                buidingInfo={building}
                                height={styles.buildingComponent.height}
                                onPress={handleBuildingPress}
                            />
                        ))}
            </ScrollView>
        </BottomSlidableModal>
    );
}

function AddBuildingComponent({ height, onPress }: AddBuildingComponentProps) {
    const styles = useBuildingSelectModalStyles().component;
    const messages = useScreenMessage().messages.words;

    return (
        <View style={[styles.container, { height }]}>
            <TouchableOpacity style={styles.wrapper} onPress={() => onPress()}>
                <View style={styles.iconBox}>
                    <Icon name="plus" size={styles.icon.width} color={styles.icon.color} />
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.text}>
                        {messages.building} {messages.add}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

function BuildingComponent({ buidingInfo, height, onPress }: BuildingComponentProps) {
    const styles = useBuildingSelectModalStyles().component;

    return (
        <View style={[styles.container, { height }]}>
            <TouchableOpacity style={styles.wrapper} onPress={() => onPress(buidingInfo)}>
                <View style={styles.iconBox}>
                    <Icon name="building" size={styles.icon.width} color={styles.icon.color} />
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.text}>{buidingInfo.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
