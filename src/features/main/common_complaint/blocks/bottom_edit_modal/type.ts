import { StyleSheet } from "react-native";
import { OutlinedBoxProps } from "../outlined_box/type";

export default interface BottomEditModalProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    noticeInfo: OutlinedBoxProps;
}

export type useBottomEditModalStylesType = ReturnType<typeof StyleSheet.create>;
