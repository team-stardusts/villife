import { StyleSheet } from "react-native";

export default interface HomeSideMoalProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export type UseHomeSideMoalStylesType = ReturnType<typeof StyleSheet.create>;
