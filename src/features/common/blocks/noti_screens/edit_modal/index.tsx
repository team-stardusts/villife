import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomSlidableModal from "../../universial/slidemodal_bottom";
import { EditIcon, TrashCanIcon } from "../../icon/noti";
import React from "react";
import StardustAlert from "../../universial/stardust_alert";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import { OutlinedBoxProps } from "../outlined_box/type";
import { DeleteNoticeParams } from "../../../../../libs/rest_apis/villife/types";
import Toast from "react-native-toast-message";
import { NoticeEventEmitter } from "../outlined_box_list/event";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../router/types";

function NotiBottomEditModal(props: BottomEditModalProps) {
    const screenSize = Dimensions.get("window");
    const navigation = useNavigation<VillifeNavigation>();
    const [deleteAlertVisible, setDeleteAlertVisible] = React.useState(false);

    React.useEffect(() => {
        if (!props.visible) setDeleteAlertVisible(false);
    }, []);

    const onDeleteButtonPress = async () => {
        const api = new VillifeServer();

        const dto: DeleteNoticeParams = {
            building_id: 3,
            notice_id: props.noticeInfo.id,
        };
        const reult = await api.deleteNotice(dto);

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
            <View style={BottomEditModalStyle.editModalContentContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("noti_modify", {
                            title: props.noticeInfo.title,
                            content: props.noticeInfo.content,
                            notiID: props.noticeInfo.id,
                        });
                    }}
                    style={BottomEditModalStyle.editModalMenu}>
                    <EditIcon color="#000000" diameter={30} />
                    <Text style={[BottomEditModalStyle.editModalMenuText, { fontSize: 20 }]}>수정하기</Text>
                    {/* font scaling 필요*/}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setDeleteAlertVisible(true);
                    }}
                    style={BottomEditModalStyle.editModalMenu}>
                    <TrashCanIcon color="#000000" diameter={30} />
                    <Text style={[BottomEditModalStyle.editModalMenuText, { fontSize: 20 }]}>삭제하기</Text>
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

export default NotiBottomEditModal;

type BottomEditModalProps = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    noticeInfo: OutlinedBoxProps;
};

const BottomEditModalStyle = StyleSheet.create({
    editButtonContainer: {
        position: "absolute",
        zIndex: 10,
        right: "5%",
    },
    editButton: {
        backgroundColor: "#DAEAFD",
        flexDirection: "row",
        alignItems: "center",
        padding: 3,
        borderRadius: 10,
    },
    editModalContentContainer: {
        marginTop: "5%",
        width: "100%",
    },
    editModalMenu: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: "10%",
        paddingBottom: "5%",
    },
    editModalMenuText: {
        marginLeft: 15,
        color: "black",
    },
});
