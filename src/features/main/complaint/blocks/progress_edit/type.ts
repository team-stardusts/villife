import { Complaint } from "../../../../../libs/rest_apis/villife/complaint/types";
export type ComplaintProgressEditModalProps = {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    complaint: Complaint;
};
