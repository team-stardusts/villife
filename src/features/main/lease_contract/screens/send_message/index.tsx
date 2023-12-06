import { View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import BuildingSendMessageScreenProps from "./types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useBuildingSendMessageScreenStyles from "./styles";

import TentantLayout from "../../blocks/tenant_layout";
import NextButton from "./blocks/next";
import ListBottomSlidableModal from "../../../../common/blocks/modal/bottom_list";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import { ModalFeature } from "../../../../common/blocks/modal/bottom_list/types";
import { useState } from "react";
import { BuildingRoomInfo } from "../../services/building_rooms/provider/types";
import useBuildingRoomContractor from "../../services/building_rooms";
import VillifeToastMessage from "../../../../common/atoms/toast";

export default function BuildingSendMessageScreen({ route }: BuildingSendMessageScreenProps) {
    const messages = useScreenMessage().messages;
    const styles = useBuildingSendMessageScreenStyles();
    const navigation = useNavigation<VillifeNavigation>();
    const contractor = useBuildingRoomContractor();

    const [noticeModalVisible, setNoticeModalVisible] = useState<boolean>(false);
    const [selectedRoom, setSelectedRoom] = useState<BuildingRoomInfo[]>([]);
    const [loading, setLoading] = useState(false);

    const resetAndToast = (isSuccessful: boolean) => {
        const message = isSuccessful ? "알림 성공" : "알림 실패";
        const toastType = isSuccessful ? "success" : "error";
        VillifeToastMessage.showBottomToast(toastType, message);
        navigation.reset({
            index: 0,
            routes: [{ name: "lease_contract" }],
        });
    };

    const sendNotification = async (title: string, content: string) => {
        setLoading(false);
        let isSuccessful = true;
        for (const selectedRooms of selectedRoom) {
            const params = {
                title,
                content,
                contractID: selectedRooms.contractInfo.contractID,
            };
            isSuccessful = await contractor.requestNotification(params);
            if (!isSuccessful) break;
        }
        resetAndToast(isSuccessful);
        if (isSuccessful) setNoticeModalVisible(false);
    };

    const notiModalFeatures: ModalFeature[] = [
        {
            icon: "pencil",
            text: "알림 작성하기",
            onPress: () => {
                setNoticeModalVisible(false);
                navigation.goBack();
                navigation.navigate("compose_message", {
                    selectedRoom: selectedRoom,
                });
            },
        },
        {
            icon: "letter",
            text: "만기 임박 알림 보내기",
            onPress: () =>
                sendNotification(
                    "만기 임박 알림",
                    "만기가 3달 남았습니다. 만기 시 연장 및 퇴실 여부 확인 부탁드립니다."
                ),
        },
        {
            icon: "letter",
            text: "월세 미납 알림 보내기",
            onPress: () =>
                sendNotification("월세 미납 알림", "월세가 미납되었습니다. 다음달까지 미납시 미납연체료가 부가됩니다."),
        },
        {
            icon: "letter",
            text: "관리비 미납 알림 보내기",
            onPress: () =>
                sendNotification(
                    "관리비 미납 알림",
                    "관리비가 미납되었습니다. 다음달까지 미납시 미납연체료가 부가됩니다."
                ),
        },
    ];

    return (
        <NavigationView
            headerOptions={{
                title: messages.main.lease_contract.send_message_to_building_tenant.screen_title,
                hideBuidingSelector: true,
                style: {
                    backgroundColor: styles.nav.backgroundColor,
                },
                navComponent: NextButton,
                navComponentProps: {
                    disabled: selectedRoom.length === 0,
                    onPress: () => setNoticeModalVisible(true),
                },
            }}
            bodyOptions={{
                backgroundColor: styles.nav.backgroundColor,
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}>
            <>
                <ListBottomSlidableModal
                    modalVisible={noticeModalVisible}
                    setModalVisible={setNoticeModalVisible}
                    features={notiModalFeatures}
                />
                <View style={styles.container}>
                    <View style={styles.listView}>
                        <TentantLayout
                            layout={route.params.layout}
                            roomInfos={JSON.parse(route.params.tenants)}
                            checkmode={true}
                            onCheckTarget={setSelectedRoom}
                        />
                    </View>
                </View>
            </>
        </NavigationView>
    );
}
