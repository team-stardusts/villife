import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { AuthStackParamList } from "../../../navigators/auth/types";

type SetBuildingScreenProps = NativeStackScreenProps<AuthStackParamList, "set_building">;

export default SetBuildingScreenProps;

export type SetBuildingScreenStylesType = {
    Screen: ReturnType<typeof StyleSheet.create>;
    InputsSection: ReturnType<typeof StyleSheet.create>;
    BlankSection: ReturnType<typeof StyleSheet.create>;
    //SocialLoginSection: ReturnType<typeof StyleSheet.create>;
};