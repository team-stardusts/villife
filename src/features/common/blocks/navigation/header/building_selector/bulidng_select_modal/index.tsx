import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import BottomSlidableModal from "../../../../universial/slidemodal_bottom";
import { BuildingComponentProps, BuildingSelectModalProps } from "./types";
import { useEffect, useState } from "react";
import { SimpleBuildingInfo } from "../../../../../../../libs/rest_apis/villife/user_info/types";
import Icon from "../../../../../atoms/icon";
import useBuildingSelectModalStyles from "./styles";

export default function BuildingSelectModal(props: BuildingSelectModalProps) {
    const styles = useBuildingSelectModalStyles().modal;
    const [modalHeight, setModalHeight] = useState<number>(0);

    const setModalHeightLimitedly = (): void | number => {
        if (props.managedBuildings === undefined || props.managedBuildings === null) return;

        // 모달의 Height가 일정 크기 이상 못커지게 제한하며, 스크롤뷰로 대체함
        const newModalHeight =
            props.managedBuildings.length * styles.buildingComponent.height + styles.buildingComponent.margin;

        if (newModalHeight > styles.modal.maxHeight) setModalHeight(styles.modal.maxHeight);
        else setModalHeight(newModalHeight);
    };

    const handleBuildingPress = (buidingInfo: SimpleBuildingInfo) => {
        // Modal이 너무 빠르게 닫히는 감이 있어서 100ms의 Delay를 줌.
        setTimeout(() => props.setVisible(false), 100);

        props.onBuildingPress(buidingInfo);
    };

    useEffect(() => {
        setModalHeightLimitedly();
    }, []);

    return (
        <BottomSlidableModal modalVisible={props.visible} setModalVisible={props.setVisible} height={modalHeight}>
            <ScrollView style={styles.container}>
                {props.managedBuildings &&
                    props.managedBuildings.map((building, index) => (
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

function BuildingComponent({ buidingInfo, height, onPress }: BuildingComponentProps) {
    const styles = useBuildingSelectModalStyles().component;

    return (
        <View style={[styles.container, { height }]}>
            <TouchableOpacity style={styles.wrapper} onPress={() => onPress(buidingInfo)}>
                <View style={styles.iconBox}>
                    <Icon name="building" size={styles.icon.width} color={styles.icon.color} />
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.buidlingName}>{buidingInfo.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
