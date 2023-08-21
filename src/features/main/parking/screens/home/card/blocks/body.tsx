import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, View } from "react-native";
import { VehicleCardBodyProps, VehicleCardInfoForEdit } from "../types";
import VehicleCard from "./card";
import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";
import VehicleModifyModal from "../../../../blocks/modal/modify";
import { useEffect, useState } from "react";
import { VehicleModifyType } from "../../../../blocks/modal/modify/types";
import { Vehicle } from "../../../../services/states/types";

export default function VehicleCardBody({ styles, cardWidth, vehicles, isEditmode, onFlip }: VehicleCardBodyProps) {
    const messages = useScreenMessage().messages;

    // ScrollView가 가로 상태일 때, 현재 페이지를 구함
    const getCurrentPage = (scollEvent: NativeSyntheticEvent<NativeScrollEvent>, scrollViewWidth: number): number => {
        // ScrollView width 값이 실제로 지정한 값 보다 근소하게 작게 적용되는 현상이 발생함.
        // 따라서, 인자로 받는 ScrollView의 Width의 95%의 수치만 사용함.
        scrollViewWidth *= 0.95;

        let index: number = parseInt((scollEvent.nativeEvent.contentOffset.x / scrollViewWidth).toString());

        if (index === -0) index = 0;

        return index;
    };
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [vehicleToEdit, setVehicleToEdit] = useState<VehicleCardInfoForEdit | null>(null);

    useEffect(() => {
        if (vehicleToEdit) setModalVisible(true);
    }, [vehicleToEdit]);

    return (
        <View style={styles.container}>
            {vehicleToEdit ? (
                <VehicleModifyModal
                    modifyType={vehicleToEdit.modifyType}
                    visible={modalVisible}
                    setVisible={setModalVisible}
                    vehilce={vehicleToEdit.vehicle}
                />
            ) : (
                <></>
            )}

            <ScrollView
                style={[styles.scrollview, { width: cardWidth }]}
                showsHorizontalScrollIndicator={false}
                horizontal
                pagingEnabled
                scrollEventThrottle={5}
                onScroll={(e) => onFlip(getCurrentPage(e, cardWidth))}>
                {vehicles.map((vehicle, index) => (
                    <VehicleCard
                        key={index}
                        vehicle={vehicle}
                        cardWidth={cardWidth}
                        isEditmode={isEditmode}
                        onPressEditBtn={setVehicleToEdit}
                    />
                ))}
                {vehicles.length === 0 && (
                    <View style={[styles.noCardContainer, { width: cardWidth }]}>
                        <View style={styles.noCardTitleBox}>
                            <Text style={styles.noCardTitle}>{messages.main.parking.home.say_no_vehicle_info}</Text>
                            <Text style={styles.noCardSubtitle}>
                                {messages.main.parking.home.induce_to_register_own_vehicle}
                            </Text>
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
