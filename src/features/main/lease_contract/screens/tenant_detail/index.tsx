import { ScrollView } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import BuildingTentantMessage from "../../blocks/message";
import useTenantDetailScreenStyles from "./styles";
import TenantDetailScreenProps from "./types";
import { useMemo, useState } from "react";
import TenantInfo from "./blocks/tenant_info";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import ListBottomSlidableModal from "../../../../common/blocks/modal/bottom_list";
import { ModalFeature } from "../../../../common/blocks/modal/bottom_list/types";
import { VillifeNavigation } from "../../../../common/router/types";
import { useNavigation } from "@react-navigation/native";
import VillifeToastMessage from "../../../../common/atoms/toast";
import ContractMemoRegistrationBox from "./blocks/memo/registration";
import useRoomViewModel from "../../viewmodel/room";
import ContractMemo from "./blocks/memo/memo";
import SimpleNavComponent from "../../../../common/blocks/navigation/header/navcomponent";

export default function TenantDetailScreen({ route }: TenantDetailScreenProps) {
    const styles = useTenantDetailScreenStyles();
    const navigation = useNavigation<VillifeNavigation>();
    const messages = useScreenMessage().messages;
    const viewModel = useRoomViewModel();
    const [isMemoEditMode, setIsMemoEditMode] = useState<boolean>(false);
    const [noticeModalVisible, setNoticeModalVisible] = useState<boolean>(false);

    const room = useMemo(() => {
        if (viewModel === null) return null;

        const _room = viewModel.data.find((v) => v.roomId === route.params.roomId);

        return _room === undefined ? null : _room;
    }, [route.params.roomId, viewModel?.data]);

    const sendNotification = async (title: string, content: string) => {
        if (room === null || viewModel === null) {
            return;
        }

        const params = {
            contractId: room.contractInfo.contractId,
            content,
            title,
        };

        const isSuccessful = await viewModel.sendNotification(params);

        if (isSuccessful) {
            VillifeToastMessage.showBottomToast("success", "알림을 보냈어요!");
            setNoticeModalVisible(false);
        } else {
            VillifeToastMessage.showBottomToast("error", "알림을 보내지 못했어요...");
            setNoticeModalVisible(false);
        }
    };

    const notiModalFeatures: ModalFeature[] = [
        {
            icon: "pencil",
            text: "알림 작성하기",
            onPress: () => {
                setNoticeModalVisible(false);
                navigation.navigate("compose_message", { contractID: room?.contractInfo.contractId });
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
                title: "계약 정보",
                style: {
                    backgroundColor: styles.nav.backgroundColor,
                },
                hideBuidingSelector: true,
                navComponent: isMemoEditMode ? SimpleNavComponent : BuildingTentantMessage,
                navComponentProps: isMemoEditMode
                    ? {
                          title: "취소",
                          onPress: () => setIsMemoEditMode(false),
                      }
                    : {
                          onPress: () => setNoticeModalVisible(true),
                      },
            }}
            bodyOptions={{
                backgroundColor: styles.nav.backgroundColor,
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {room && (
                    <>
                        <TenantInfo styles={styles} room={room} messages={messages} />
                        <ContractMemoRegistrationBox contractId={room.contractInfo.contractId} />
                        {room.contractInfo.memo !== undefined &&
                            [...room.contractInfo.memo]
                                // Memo ID 내림차순 (늦게 등록했을 수록 위에)
                                .sort((a, b) => {
                                    if (a.memoId > b.memoId) return -1;
                                    else if (a.memoId < b.memoId) return 1;
                                    else return 0;
                                })
                                .map((memo, index) => (
                                    <ContractMemo
                                        key={index}
                                        contractId={room.contractInfo.contractId}
                                        isEditMode={isMemoEditMode}
                                        setIsEditMode={setIsMemoEditMode}
                                        {...memo}
                                    />
                                ))}
                    </>
                )}
            </ScrollView>
            <ListBottomSlidableModal
                modalVisible={noticeModalVisible}
                setModalVisible={setNoticeModalVisible}
                features={notiModalFeatures}
            />
        </NavigationView>
    );
}
