import React from "react";
import Toast from "react-native-toast-message";
import { NoticeEventEmitter } from "../outlined_box_list/event";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import StardustModal from "../../../../common/blocks/universial/stardust_modal";
import BottomEditModalProps from "./type";
import useBottomEditModalStyles from "./style";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useStyler from "../../../../common/hooks/styler/hooks";
import useNoticeService from "../../services";
import useUserInformation from "../../../../common/hooks/service/user_info";
import ListBottomSlidableModal from "../../../../common/blocks/bottom_list_modal";

export default function NotiBottomEditModal(props: BottomEditModalProps) {
    const user = useUserInformation();
    const styles = useBottomEditModalStyles();
    const messages = useScreenMessage();
    const service = useNoticeService();
    const { deviceUI, theme } = useStyler();
    const navigation = useNavigation<VillifeNavigation>();
    const [deleteAlertVisible, setDeleteAlertVisible] = React.useState(false);

    React.useEffect(() => {
        if (!props.visible) setDeleteAlertVisible(false);
    }, []);

    const onDeleteButtonPress = async () => {
        if (user?.isAdmin && user.adminInfomation?.selectedBuilding.id) {
            const result = await service.deleteNotice({
                building_id: user.adminInfomation?.selectedBuilding.id,
                notice_id: props.noticeInfo.id,
            });
            console.log("delete : ", result);
            if (result.isSuccessful) {
                new NoticeEventEmitter().emitListUpdatedEvent();
                props.setVisible(false);
                setDeleteAlertVisible(false);
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
                        },
                    },
                    {
                        icon: "trash-can",
                        text: messages.messages.main.noti.delete,
                        onPress: () => {
                            props.setVisible(false);
                            setDeleteAlertVisible(true);
                        },
                    },
                ]}
            />
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
