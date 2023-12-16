import { Alert, Text, TouchableOpacity, View } from "react-native";
import { VehicleInfoRowProps } from "../types";
import Badge from "../../../../../../common/atoms/badge";
import VillifeToastMessage from "../../../../../../common/atoms/toast";
import Icon from "../../../../../../common/atoms/icon";
import VehicleDetailModal from "../../../../blocks/modal/detail";
import { useState } from "react";
import Telephone from "../../../../../../../libs/call";
import { Callable } from "../../../../../../../libs/call/types";
import BottomMessageSelectionModal from "../../../../blocks/modal/message";

export default function VehicleInfoRow(props: VehicleInfoRowProps) {
    const phone: Callable = new Telephone();
    const [detailVisible, setDetailVisible] = useState<boolean>(false);
    const [messageModalVisible, setMessageModalVisible] = useState<boolean>(false);
    const badgeTitle =
        props.vehicle.ownerType !== "guest" ? props.vehicle.roomNumber.toString() : props.messages.words.visit;
    const badgeStyle = props.vehicle.ownerType !== "guest" ? props.styles.tenantBadge : props.styles.guestBadge;
    const isMyVehicle = props.vehicle.roomNumber === props.userRoomNumber;

    const callTo = async () => {
        const who =
            props.vehicle.ownerType === "guest"
                ? `${props.vehicle.roomNumber}호 방문자`
                : `${props.vehicle.roomNumber}호`;

        Alert.alert(`${who}와 전화통화 하시겠어요?`, undefined, [
            {
                text: "취소",
            },
            {
                text: "확인",
                onPress: async () => {
                    if (!(await phone.call(props.vehicle.phoneNumber))) {
                        VillifeToastMessage.showBottomToast("error", "죄송합니다. 전화를 연결하지 못했어요.");
                    }
                },
            },
        ]);
    };

    return (
        <View style={props.styles.container}>
            <View style={props.styles.vehicleInfoBox}>
                <Badge
                    title={badgeTitle}
                    size={badgeStyle.width}
                    color={badgeStyle.color}
                    bgColor={badgeStyle.backgroundColor}
                />
                <Text style={props.styles.plateNumber} adjustsFontSizeToFit numberOfLines={1}>
                    {props.vehicle.plateNumber}
                </Text>
            </View>
            <View style={props.styles.communicationFuncContainer}>
                {/* <TouchableOpacity
                    activeOpacity={0.6}
                    style={props.styles.communicationIconBox}
                    disabled={isMyVehicle}
                    onPress={callTo}>
                    <Icon
                        name="phone"
                        size={props.styles.phoneIcon.width}
                        color={isMyVehicle ? props.styles.disabledIcon.color : props.styles.icon.color}
                    />
                </TouchableOpacity> */}

                {!props.isAdmin && (
                    <>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={props.styles.communicationIconBox}
                            disabled={isMyVehicle || props.vehicle.ownerType === "guest"}
                            onPress={() => setMessageModalVisible(true)}>
                            <Icon
                                name="letter"
                                size={props.styles.letterIcon.width}
                                color={
                                    isMyVehicle || props.vehicle.ownerType === "guest"
                                        ? props.styles.disabledIcon.color
                                        : props.styles.icon.color
                                }
                            />
                        </TouchableOpacity>
                        <BottomMessageSelectionModal
                            vehicleID={props.vehicle.id}
                            visible={messageModalVisible}
                            setVisible={setMessageModalVisible}
                        />
                    </>
                )}
            </View>
            <View style={props.styles.detailFuncContainer}>
                <TouchableOpacity
                    style={props.styles.detailIconBox}
                    activeOpacity={0.6}
                    // [TO-DO] 방문자 수정 Function 추가 필요
                    onPress={() => setDetailVisible(true)}>
                    <Icon
                        name="three-dots-vertical"
                        size={props.styles.detailIcon.width}
                        color={props.styles.icon.color}
                    />
                </TouchableOpacity>
                <VehicleDetailModal
                    userRoomNumber={props.userRoomNumber}
                    visible={detailVisible}
                    setVisible={setDetailVisible}
                    vehicle={props.vehicle}
                />
            </View>
        </View>
    );
}
