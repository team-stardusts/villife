import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { NoticeEventEmitter } from "../outlined_box_list/event";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import BottomEditModalProps from "./type";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useNoticeService from "../../services";
import useUserInformation from "../../../../common/hooks/service/user_info";
import ListBottomSlidableModal from "../../../../common/blocks/modal/bottom_list";
import { StardustAlertContent } from "../../../../common/blocks/universial/stardust_alert/types";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";

export default function NotiBottomEditModal(props: BottomEditModalProps) {
    const user = useUserInformation();
    const messages = useScreenMessage();
    const service = useNoticeService();
    const navigation = useNavigation<VillifeNavigation>();
    const [alert, setAlert] = useState<StardustAlertContent>({
        type: "warning",
        title: "정말로 삭제하시겠습니까?",
        message: "삭제된 공지사항은 복구 할 수 없습니다.",
        visible: false,
        buttons: [
            {
                onPress: () => handlePressCancleAlertBtn(),
                text: "취소",
            },
            {
                onPress: () => handlePressDeleteBtn(),
                text: "삭제",
            },
        ],
    });

    useEffect(() => {
        if (!props.visible) setAlert({ ...alert, visible: false });
    }, []);

    const handlePressDeleteBtn = async () => {
        if (user?.isAdmin && user.adminInfomation?.selectedBuilding.id) {
            const result = await service.deleteNotice({
                building_id: user.adminInfomation?.selectedBuilding.id,
                notice_id: props.noticeInfo.id,
            });
            console.log("delete : ", result);
            if (result.isSuccessful) {
                new NoticeEventEmitter().emitListUpdatedEvent();
                props.setVisible(false);
                setAlert({ ...alert, visible: false });
                Toast.show({
                    type: "success",
                    text1: messages.messages.main.noti.delete_success,
                    position: "bottom",
                    visibilityTime: 1500,
                    bottomOffset: 100,
                });
            } else {
                Toast.show({
                    type: "error",
                    text1: messages.messages.main.noti.delete_error,
                    position: "bottom",
                    visibilityTime: 1500,
                    bottomOffset: 100,
                });
            }
        }
    };

    const handlePressCancleAlertBtn = () => {
        setAlert({
            ...alert,
            visible: false,
        });
    };

    return (
        <>
            <ListBottomSlidableModal
                modalVisible={props.visible}
                setModalVisible={props.setVisible}
                features={[
                    {
                        icon: "pencil",
                        text: messages.messages.main.noti.modify,
                        onPress: () => {
                            navigation.navigate("noti_modify", {
                                title: props.noticeInfo.title,
                                content: props.noticeInfo.content,
                                notiID: props.noticeInfo.id,
                                priority: props.noticeInfo.priority,
                            });

                            props.setVisible(false);
                        },
                    },
                    {
                        icon: "trash-can",
                        text: messages.messages.main.noti.delete,
                        onPress: () => {
                            props.setVisible(false);
                            setAlert({ ...alert, visible: true });
                        },
                    },
                ]}
            />
            <StardustAlert {...alert} setAlert={setAlert} />
            {/* <StardustModal
                modalVisible={deleteAlertVisible}
                setModalVisible={setDeleteAlertVisible}
                title={messages.messages.main.noti.delete_title}
                buttons={[
                    {
                        text: messages.messages.words.cancle,
                        onPress: () => setDeleteAlertVisible(false),
                    },
                    {
                        text: messages.messages.words.delete,
                        onPress: () => handlePressDeleteBtn(),
                    },
                ]}
            /> */}
            {/* <BottomSlidableModal
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            height={deviceUI.getScreenSize().height * 0.2}>
            <View style={styles.editModalContentContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("noti_modify", {
                            title: props.noticeInfo.title,
                            content: props.noticeInfo.content,
                            notiID: props.noticeInfo.id,
                            priority: props.noticeInfo.priority,
                        });
                        props.setVisible(false);
                    }}
                    style={styles.editModalMenu}>
                    <EditIcon size={styles.iconSize.width as number} />
                    <Text style={styles.editModalMenuText}>{messages.messages.main.noti.modify}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setDeleteAlertVisible(true);
                    }}
                    style={styles.editModalMenu}>
                    <Icon name={"trash-can"} size={styles.iconSize.width as number} />
                    <Text style={styles.editModalMenuText}>{messages.messages.main.noti.delete}</Text>
                </TouchableOpacity>

                <StardustModal
                    modalVisible={deleteAlertVisible}
                    setModalVisible={setDeleteAlertVisible}
                    title={messages.messages.main.noti.delete_title}
                    buttons={[
                        {
                            text: messages.messages.words.cancle,
                            onPress: () => setDeleteAlertVisible(false),
                        },
                        {
                            text: messages.messages.words.delete,
                            onPress: () => onDeleteButtonPress(),
                        },
                    ]}
                />
            </View>
        </BottomSlidableModal> */}
        </>
    );
}
