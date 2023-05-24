import { StyleSheet } from "react-native";
import { OutlinedBoxProps } from "../outlined_box/type";

export default interface ApprovalRequiredModalProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    noticeInfo: OutlinedBoxProps;
}

export type UseApprovalRequiredModalStylesType = ReturnType<typeof StyleSheet.create>;
