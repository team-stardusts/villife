import { StyleSheet } from "react-native";
import { ComplaintHomeDisplayMode } from "../../screens/home/types";

export default interface HomeEditModalProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setDisplayMode: (displayMode: ComplaintHomeDisplayMode) => void;
}

export type useBottomEditModalStylesType = ReturnType<typeof StyleSheet.create>;
