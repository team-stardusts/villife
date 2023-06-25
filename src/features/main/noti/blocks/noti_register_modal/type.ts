import { StyleSheet } from "react-native";

export default interface HomeEditModalProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onPrioritySubmit: (event: any) => void;
}

export type useBottomEditModalStylesType = ReturnType<typeof StyleSheet.create>;
