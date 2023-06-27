import { StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";

export type useBottomEditModalStylesType = ReturnType<typeof StyleSheet.create>;

type HomeEditModalProps = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    content: string;
    navigation: NativeStackNavigationProp<VillifeStackParamList, "noti_register", undefined>;
};

export default HomeEditModalProps;
