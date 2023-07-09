import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { VillifeStackParamList } from "../../../common/router/types";

type SetBuildingScreenProps = NativeStackScreenProps<VillifeStackParamList, "set_building">;

export default SetBuildingScreenProps;

export type SetBuildingScreenStylesType = {
    screen: ReturnType<typeof StyleSheet.create>;
    inputsSection: ReturnType<typeof StyleSheet.create>;
    blankSection: ReturnType<typeof StyleSheet.create>;
    //SocialLoginSection: ReturnType<typeof StyleSheet.create>;
};
