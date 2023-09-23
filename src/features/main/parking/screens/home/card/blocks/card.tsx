import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";
import { VehicleCardProps } from "../types";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import useVehicleCardViewStyles from "../styles";
import { VehicleModifyType } from "../../../../blocks/modal/modify/types";
import { useEffect, useRef } from "react";
import { ANIMATION_DURATION_FAST_LV2 } from "../../../../../../common/constants";

export default function VehicleCard({ vehicle, cardWidth, isEditmode, onPressEditBtn }: VehicleCardProps) {
    const messages = useScreenMessage();
    const styles = useVehicleCardViewStyles(isEditmode).card;

    const etdHour = vehicle.etd.getHours().toString();
    const etdMin = vehicle.etd.getMinutes().toString();
    const etaHour = vehicle.eta.getHours().toString();
    const etaMin = vehicle.eta.getMinutes().toString();

    const cardData: Array<{ rowKey: string; rowValue: string }> = [
        {
            rowKey: messages.messages.words.plate_number,
            rowValue: vehicle.plate_number,
        },
        {
            rowKey: messages.messages.words.vehicle_info,
            rowValue: vehicle.model,
        },
        {
            rowKey: messages.messages.words.vehicle_departure_time,
            rowValue: `${etdHour.length === 1 ? 0 + etdHour : etdHour}:${etdMin.length === 1 ? 0 + etdMin : etdMin}`,
        },
        {
            rowKey: messages.messages.words.vehicle_arrival_time,
            rowValue: `${etaHour.length === 1 ? 0 + etaHour : etaHour}:${etaMin.length === 1 ? 0 + etaMin : etaMin}`,
        },
    ];

    const handlePressEditBtn = (type: VehicleModifyType) => {
        onPressEditBtn({
            modifyType: type,
            vehicle: vehicle,
        });
    };

    return (
        <View style={[styles.card, { width: cardWidth }]}>
            <View style={styles.cardRowsWrapper}>
                {cardData.map((datum, index) => (
                    <CardRow styles={styles} key={index} rowKey={datum.rowKey} rowValue={datum.rowValue} />
                ))}
            </View>
            {isEditmode ? (
                <View style={styles.editBtnsBox}>
                    <EditButton styles={styles} type={"etda"} onPress={handlePressEditBtn} />
                    <EditButton styles={styles} type={"info"} onPress={handlePressEditBtn} />
                </View>
            ) : (
                <></>
            )}
        </View>
    );
}

function CardRow({
    styles,
    rowKey,
    rowValue,
}: {
    styles: ReturnType<typeof useVehicleCardViewStyles>["card"];
    rowKey: string;
    rowValue: string;
}) {
    return (
        <View style={styles.rowWrapper}>
            <Text style={styles.rowKey}>{rowKey}</Text>
            <Text style={styles.rowValue}>{rowValue}</Text>
        </View>
    );
}

function EditButton({
    styles,
    type,
    onPress,
}: {
    styles: ReturnType<typeof useVehicleCardViewStyles>["card"];
    type: VehicleModifyType;
    onPress(type: VehicleModifyType): void;
}) {
    const messages = useScreenMessage().messages.main.parking.home;
    const opacityValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacityValue, {
            toValue: 1,
            duration: ANIMATION_DURATION_FAST_LV2,
            useNativeDriver: true,
        }).start();
    }, [opacityValue]);

    return (
        <Animated.View
            style={[
                styles.editBtnWrapper,
                {
                    opacity: opacityValue,
                },
            ]}>
            <TouchableOpacity style={styles.editBtn} activeOpacity={0.5} onPress={() => onPress(type)}>
                <Text style={styles.editBtnTitle}>{type === "etda" ? messages.edit_etda : messages.edit_info}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}
