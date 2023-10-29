import { Alert, Text, TouchableOpacity, View } from "react-native";
import { VehicleListBodyViewProps } from "../types";
import Badge from "../../../../../../common/atoms/badge";
import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";
import useVehicleListStyles from "../styles";
import MultilingualMessage from "../../../../../../common/hooks/multilingual";
import { Vehicle } from "../../../../services/states/types";
import VillifeToastMessage from "../../../../../../common/atoms/toast";
import Icon from "../../../../../../common/atoms/icon";
import MessageSelectionModal from "../../../../blocks/modal/message_selection";
import VehicleDetailModal from "../../../../blocks/modal/detail";
import { useState } from "react";
import useUserInformation from "../../../../../../common/hooks/service/user_info";
import Telephone from "../../../../../../../libs/call";
import { Callable } from "../../../../../../../libs/call/types";

export default function VehicleListBodyView(props: VehicleListBodyViewProps) {
    const messages = useScreenMessage().messages;
    const user = useUserInformation();

    // [TO-DO] Room number를 가져오는 function이 필요함
    const getUserRoomNumber = (): number | undefined => {
        return user?.roomNumber;
    };

    return (
        <View style={props.styles.container}>
            {props.vehicles.map((vehicle, index) => {
                return (
                    <VehicleInfoRow
                        key={index}
                        isAdmin={user?.isAdmin ?? false}
                        userRoomNumber={getUserRoomNumber()}
                        styles={props.styles}
                        messages={messages}
                        vehicle={vehicle}
                    />
                );
            })}
        </View>
    );
}

function VehicleInfoRow(props: VehicleInfoRowProps) {
    const phone: Callable = new Telephone();
    const [detailVisible, setDetailVisible] = useState<boolean>(false);
    const badgeTitle =
        props.vehicle.ownerType !== "guest" ? props.vehicle.room_number.toString() : props.messages.words.visit;
    const badgeStyle = props.vehicle.ownerType !== "guest" ? props.styles.tenantBadge : props.styles.guestBadge;
    const isMyVehicle = props.vehicle.room_number === props.userRoomNumber;

    const callTo = async () => {
        const who =
            props.vehicle.ownerType === "guest"
                ? `${props.vehicle.room_number}호 방문자`
                : `${props.vehicle.room_number}호`;

        Alert.alert(`${who}와 전화통화 하시겠어요?`, undefined, [
            {
                text: "취소",
            },
            {
                text: "확인",
                onPress: async () => {
                    if (!(await phone.call(props.vehicle.phone_number))) {
                        VillifeToastMessage.showBottomToast(
                            "error",
                            "죄송합니다. 전화를 연결하지 못했어요.\n관리자를 통해 의견 전달 부탁드려요."
                        );
                    }
                },
            },
        ]);
    };

    return (
        <View style={props.styles.vehicleInfoContainer}>
            <View style={props.styles.vehicleInfoBox}>
                <Badge
                    title={badgeTitle}
                    size={badgeStyle.width}
                    color={badgeStyle.color}
                    bgColor={badgeStyle.backgroundColor}
                />
                <Text style={props.styles.plateNumber}>{props.vehicle.plate_number}</Text>
            </View>
            <View style={props.styles.communicationFuncContainer}>
                {!isMyVehicle && (
                    <>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={props.styles.communicationIconBox}
                            onPress={callTo}>
                            <Icon
                                name="phone"
                                size={props.styles.phoneIcon.width}
                                color={props.styles.phoneIcon.color}
                            />
                        </TouchableOpacity>
                        <View style={props.styles.communicationIconBox}>
                            {!props.isAdmin && <MessageSelectionModal vehicleID={props.vehicle.id} />}
                        </View>
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
                        color={props.styles.detailIcon.color}
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

type VehicleInfoRowProps = {
    isAdmin: boolean;
    messages: MultilingualMessage["messages"];
    vehicle: Vehicle;
    userRoomNumber: number | undefined;
    styles: ReturnType<typeof useVehicleListStyles>["body"];
};
