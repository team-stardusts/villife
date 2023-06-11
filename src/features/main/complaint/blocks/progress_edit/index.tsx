import { useRef } from "react";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useComplaintService from "../../services";
import ComplaintContentCard from "../content_card";
import { ComplaintProgressEditModalProps } from "./type";
import { ComplaintStatus } from "../../../../../libs/rest_apis/villife/complaint/types";
import VillifeToastMessage from "../../../../common/atoms/toast";
import { ComplaintEventEmitter } from "../../services/event";

export default function ComplaintProgressEditModal(props: ComplaintProgressEditModalProps) {
    const message = useScreenMessage();
    const service = useComplaintService();
    const updatedStatus = useRef<ComplaintStatus>();

    const onPressModifyButton = async () => {
        if (!updatedStatus.current) return VillifeToastMessage.showBottomToast("error", "상태를 변경하지 않으셨어요");
        const result = await service.UpdateComplaint({
            complaint_id: props.complaint.id,
            content: props.complaint.content,
            status: updatedStatus.current,
            title: props.complaint.title,
        });

        if (!result.isSuccessful) return VillifeToastMessage.showBottomToast("error", "상태를 변경에 실패 했습니다.");

        new ComplaintEventEmitter().emitListUpdatedEvent();
        props.setModalVisible(false);
    };

    return (
        <StardustAlert
            title={message.messages.main.complaint.edit_progress_status}
            subtitle={message.messages.main.complaint.edit_progress_status_guide}
            modalVisible={props.modalVisible}
            setModalVisible={props.setModalVisible}
            leftButtonText={message.messages.words.cancle}
            onPressLeftBtn={() => {
                props.setModalVisible(false);
            }}
            rightButtonText={message.messages.words.edit}
            onPressRightBtn={() => {
                onPressModifyButton();
            }}
            children={<ComplaintContentCard info={props.complaint} editMode={true} updatedStatus={updatedStatus} />}
        />
    );
}
