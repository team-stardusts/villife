import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import DetailEditModalProps from "./type";
import { ComplaintEventEmitter } from "../../services/event";
import useComplaintService from "../../services";
import VillifeToastMessage from "../../../../common/atoms/toast";
import { ModalFeature } from "../../../../common/blocks/modal/bottom_list/types";
import ListBottomSlidableModal from "../../../../common/blocks/modal/bottom_list";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import { StardustAlertContent } from "../../../../common/blocks/universial/stardust_alert/types";

export default function ComplaintDetailEditModal(props: DetailEditModalProps) {
    const service = useComplaintService();
    const navigation = useNavigation<VillifeNavigation>();
    const [alert, setAlert] = useState<StardustAlertContent>({
        type: "warning",
        title: "정말로 삭제하시겠습니까?",
        message: "삭제된 민원은 복구 할 수 없습니다.",
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

    const handlePressModifyBtn = async () => {
        if (props.ComplaintInfo.status == "received") navigation.navigate("complaint_modify", props.ComplaintInfo);
        else VillifeToastMessage.showBottomToast("error", "접수중인 민원만 수정 할 수 있습니다.");

        props.setVisible(false);
    };

    const handlePressDeleteBtn = async () => {
        const result = await service.deleteComplaint({ complaint_id: props.ComplaintInfo.id });

        if (!result.isSuccessful) {
            VillifeToastMessage.showBottomToast("error", "민원 삭제에 실패했습니다");
            setAlert({ ...alert, visible: false });

            return props.setVisible(false);
        }

        const emitter = new ComplaintEventEmitter();
        emitter.emitListUpdatedEvent();

        setAlert({ ...alert, visible: false });
        props.setVisible(false);

        navigation.goBack();
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
                        onPress: () => handlePressModifyBtn(),
                        text: "수정하기",
                    },
                    {
                        icon: "trash-can",
                        onPress: () => {
                            props.setVisible(false);
                            setAlert({ ...alert, visible: true });
                        },
                        text: "삭제하기",
                    },
                ]}
            />
            <StardustAlert {...alert} setAlert={setAlert} />
        </>
    );
}
