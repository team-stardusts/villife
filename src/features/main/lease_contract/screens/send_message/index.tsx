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

export default function BuildingSendMessageScreen({ route }: BuildingSendMessageScreenProps) {
    const messages = useScreenMessage().messages;
    const styles = useBuildingSendMessageScreenStyles();
    const navigation = useNavigation<VillifeNavigation>();
    const [noticeModalVisible, setNoticeModalVisible] = useState<boolean>(false);
    const [selectedRoom, setSelectedRoom] = useState<BuildingRoomInfo[]>([]);

    const notiModalFeatures: ModalFeature[] = [
        {
            icon: "pencil",
            text: "알림 작성하기",
            onPress: () => {
                setNoticeModalVisible(false);
                navigation.goBack();
                navigation.navigate("compose_message", {
                    contractID: selectedRoom[0].contractInfo.contractID,
                });
            },
        },
        {
            icon: "letter",
            text: "만기 임박 알림 보내기",
            onPress: () => {
                setNoticeModalVisible(false);
                console.log("만기 임박 알림 보내기");
            },
        },
        {
            icon: "letter",
            text: "월세 미납 알림 보내기",
            onPress: () => {
                setNoticeModalVisible(false);
                console.log("월세 미납 알림 보내기");
            },
        },
        {
            icon: "letter",
            text: "관리비 미납 알림 보내기",
            onPress: () => {
                setNoticeModalVisible(false);
                console.log("관리비 미납 알림 보내기");
            },
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
