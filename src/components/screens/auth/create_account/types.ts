import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { StyleSheet } from "react-native/types";
import { StackParamList } from "../../../router/types";

type CreateAccountScreenProps = NativeStackScreenProps<StackParamList, "create_account">;

export default CreateAccountScreenProps;

export type CreateAccountScreenStylesType = {
    Screen: ReturnType<typeof StyleSheet.create>;
    UserTypeIconSection: ReturnType<typeof StyleSheet.create>;
    InputsSection: ReturnType<typeof StyleSheet.create>;
    //SocialLoginSection: ReturnType<typeof StyleSheet.create>;
};
