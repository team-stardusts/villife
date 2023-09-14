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

export default function TenantDetailScreen({ route }: TenantDetailScreenProps) {
    const styles = useTenantDetailScreenStyles();
    const navigation = useNavigation<VillifeNavigation>();
    const messages = useScreenMessage().messages;
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
                navigation.navigate("compose_message", {});
            },
        },
        {
            icon: "letter",
            text: "만기 임박 알림 보내기",
            onPress: () => console.log("만기 임박 알림 보내기"),
        },
        {
            icon: "letter",
            text: "월세 미납 알림 보내기",
            onPress: () => console.log("월세 미납 알림 보내기"),
        },
        {
            icon: "letter",
            text: "관리비 미납 알림 보내기",
            onPress: () => console.log("관리비 미납 알림 보내기"),
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
