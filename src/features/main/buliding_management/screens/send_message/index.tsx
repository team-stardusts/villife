import { View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import BuildingSendMessageScreenProps from "./types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useBuildingSendMessageScreenStyles from "./styles";

import TentantLayout from "../../blocks/tenant_layout";
import VillifeToastMessage from "../../../../common/atoms/toast";
import NextButton from "./blocks/next";
import ListBottomSlidableModal from "../../../../common/blocks/bottom_list_modal";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import { ModalFeature } from "../../../../common/blocks/bottom_list_modal/types";
import { useState } from "react";

export default function BuildingSendMessageScreen({ route }: BuildingSendMessageScreenProps) {
    const messages = useScreenMessage().messages;
    const styles = useBuildingSendMessageScreenStyles();
    const navigation = useNavigation<VillifeNavigation>();
    const [noticeModalVisible, setNoticeModalVisible] = useState<boolean>(false);

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
                title: messages.main.building_management.send_message_to_building_tenant.screen_title,
                hideBuidingSelector: true,
                backgroundColor: styles.nav.backgroundColor,
                navComponent: NextButton,
                navComponentProps: {
                    onPress: () => setNoticeModalVisible(true),
                },
            }}
            bodyOptions={{
                backgroundColor: styles.nav.backgroundColor,
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}>
            <ListBottomSlidableModal
                modalVisible={noticeModalVisible}
                setModalVisible={setNoticeModalVisible}
                features={notiModalFeatures}
            />
            <View style={styles.container}>
                <View style={styles.listView}>
                    <TentantLayout
                        layout={route.params.layout}
                        tenants={JSON.parse(route.params.tenants)}
                        checkmode={true}
                        onCheckTarget={(tenants) => {
                            /* tenants.map((element) => {
                                console.log(element.roomNumber);
                            }); */
                        }}
                    />
                </View>
            </View>
        </NavigationView>
    );
}
