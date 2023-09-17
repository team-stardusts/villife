import { ScrollView } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import BuildingTentantMessage from "../../blocks/message";
import useTenantDetailScreenStyles from "./styles";
import TenantDetailScreenProps from "./types";
import { useEffect, useState } from "react";
import { BuildingRoomInfo } from "../../services/building_rooms/provider/types";
import TenantInfo from "./blocks/tenant_info";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import ListBottomSlidableModal from "../../../../common/blocks/bottom_list_modal";
import { ModalFeature } from "../../../../common/blocks/bottom_list_modal/types";
import { VillifeNavigation } from "../../../../common/router/types";
import { useNavigation } from "@react-navigation/native";
import useBuildingRoomContractor from "../../services/building_rooms";
import VillifeToastMessage from "../../../../common/atoms/toast";

export default function TenantDetailScreen({ route }: TenantDetailScreenProps) {
    const styles = useTenantDetailScreenStyles();
    const navigation = useNavigation<VillifeNavigation>();
    const messages = useScreenMessage().messages;
    const contractor = useBuildingRoomContractor();
    const [tenant, setTenant] = useState<BuildingRoomInfo>(JSON.parse(route.params.roomInfo));
    const [noticeModalVisible, setNoticeModalVisible] = useState<boolean>(false);

    useEffect(() => {
        setTenant(JSON.parse(route.params.roomInfo));
    }, [route.params.roomInfo]);

    const notiModalFeatures: ModalFeature[] = [
        {
            icon: "pencil",
            text: "알림 작성하기",
            onPress: () => {
                navigation.navigate("compose_message", { contractID: route.params.contractID });
            },
        },
        {
            icon: "letter",
            text: "만기 임박 알림 보내기",
            onPress: async () => {
                let isSuccessful: boolean = false;
                const params = {
                    title: "만기 임박 알림",
                    content: "만기가 3달 남았습니다. 만기 시  연장 및  퇴실 여부 확인 부탁드립니다.",
                    contractID: route.params.contractID,
                };
                isSuccessful = await contractor.requestNotification(params);
                if (isSuccessful) {
                    VillifeToastMessage.showBottomToast("success", "알림 완료");
                    setNoticeModalVisible(false);
                }
            },
        },
        {
            icon: "letter",
            text: "월세 미납 알림 보내기",
            onPress: async () => {
                let isSuccessful: boolean = false;
                const params = {
                    title: "월세 미납 알림",
                    content: "월세가 미납되었습니다. 다음달까지 미납시 미납연체료가 부가됩니다.",
                    contractID: route.params.contractID,
                };
                isSuccessful = await contractor.requestNotification(params);
                if (isSuccessful) {
                    VillifeToastMessage.showBottomToast("success", "알림 완료");
                    setNoticeModalVisible(false);
                }
            },
        },
        {
            icon: "letter",
            text: "관리비 미납 알림 보내기",
            onPress: async () => {
                let isSuccessful: boolean = false;
                const params = {
                    title: "관리비 미납 알림",
                    content: "관리비가 미납되었습니다. 다음달까지 미납시 미납연체료가 부가됩니다.",
                    contractID: route.params.contractID,
                };
                isSuccessful = await contractor.requestNotification(params);
                if (isSuccessful) {
                    VillifeToastMessage.showBottomToast("success", "알림 완료");
                    setNoticeModalVisible(false);
                }
            },
        },
    ];

    return (
        <NavigationView
            headerOptions={{
                title: "세입자 정보",
                style: {
                    backgroundColor: styles.nav.backgroundColor,
                },
                hideBuidingSelector: true,
                navComponent: BuildingTentantMessage,
                navComponentProps: {
                    onPress: () => setNoticeModalVisible(true),
                },
            }}
            bodyOptions={{
                backgroundColor: styles.nav.backgroundColor,
                applyDefaultHorizontalPadding: true,
                applyDefaultVerticalPadding: false,
            }}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <TenantInfo styles={styles} tenant={tenant} messages={messages} />
                {/* <View style={styles.tenantVehicleInfoConainer}>
                    <TitleCard title="세입자 정보">
                        <View></View>
                    </TitleCard>
                </View> */}
            </ScrollView>
            <ListBottomSlidableModal
                modalVisible={noticeModalVisible}
                setModalVisible={setNoticeModalVisible}
                features={notiModalFeatures}
            />
        </NavigationView>
    );
}
