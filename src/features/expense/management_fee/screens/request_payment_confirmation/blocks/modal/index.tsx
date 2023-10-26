import StardustModal from "../../../../../../common/blocks/universial/stardust_modal";
import { EnterSenderModalProps } from "./types";

export default function EnterSenderModal(props: EnterSenderModalProps) {
    return (
        <StardustModal
            title=""
            buttons={[]}
            modalVisible={props.visible}
            setModalVisible={props.setVisible}></StardustModal>
    );
}
