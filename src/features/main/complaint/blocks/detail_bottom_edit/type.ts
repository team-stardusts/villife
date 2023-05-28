import { StyleSheet } from "react-native";
import { Complaint } from "../../../../../libs/rest_apis/villife/complaint/types";

export default interface DetailEditModalProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    ComplaintInfo: Complaint;
}

export type useBottomEditModalStylesType = ReturnType<typeof StyleSheet.create>;
