import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import Toast from "react-native-toast-message";
import { NoticeEventEmitter } from "../outlined_box_list/event";
import { useNavigation } from "@react-navigation/native";
import { DeleteNoticeParams } from "../../../../../libs/rest_apis/villife/notice/types";
import { VillifeNavigation } from "../../../../common/router/types";
import BottomSlidableModal from "../../../../common/blocks/universial/slidemodal_bottom";
import { EditIcon, TrashCanIcon } from "../../../../common/blocks/icon/noti";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import BottomEditModalProps from "./type";
import useBottomEditModalStyles from "./style";

export default function NotiBottomEditModal(props: BottomEditModalProps) {
    const styles = useBottomEditModalStyles();

    const screenSize = Dimensions.get("window");
    const navigation = useNavigation<VillifeNavigation>();
    const [deleteAlertVisible, setDeleteAlertVisible] = React.useState(false);

    React.useEffect(() => {
        if (!props.visible) setDeleteAlertVisible(false);
    }, []);

    const onDeleteButtonPress = async () => {
        const notifier = VillifeServer.getNoticeManager();

        const dto: DeleteNoticeParams = {
            building_id: 3,
            notice_id: props.noticeInfo.id,
        };
        const reult = await notifier.deleteNotice(dto);

        if (reult.isSuccessful) {
            new NoticeEventEmitter().emitListUpdatedEvent();
            props.setVisible(false);
            setDeleteAlertVisible(false);
            Toast.show({
                type: "success",
                text1: `공지사항 삭제 성공`,
                position: "bottom",
                visibilityTime: 1500,
                bottomOffset: 100,
            });
        } else {
            Toast.show({
                type: "error",
                text1: `공지사항 삭제 실패`,
                position: "bottom",
                visibilityTime: 1500,
                bottomOffset: 100,
            });
        }
    };

    return (
        <BottomSlidableModal
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            height={screenSize.height * 0.3}>
            <View style={styles.editModalContentContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("noti_modify", {
                            title: props.noticeInfo.title,
                            content: props.noticeInfo.content,
                            notiID: props.noticeInfo.id,
                        });
                    }}
                    style={styles.editModalMenu}>
                    <EditIcon color="#000000" diameter={30} />
                    <Text style={[styles.editModalMenuText, { fontSize: 20 }]}>수정하기</Text>
                    {/* font scaling 필요*/}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setDeleteAlertVisible(true);
                    }}
                    style={styles.editModalMenu}>
                    <TrashCanIcon color="#000000" diameter={30} />
                    <Text style={[styles.editModalMenuText, { fontSize: 20 }]}>삭제하기</Text>
                    {/* font scaling 필요*/}
                </TouchableOpacity>

                <StardustAlert
                    modalVisible={deleteAlertVisible}
                    setModalVisible={setDeleteAlertVisible}
                    mainText="정말 삭제 하시겠어요?"
                    leftButtonText="취소"
                    rightButtonText="삭제"
                    leftOnPress={() => {
                        setDeleteAlertVisible(false);
                    }}
                    rightOnPress={() => {
                        onDeleteButtonPress();
                    }}
                />
            </View>
        </BottomSlidableModal>
    );
}
