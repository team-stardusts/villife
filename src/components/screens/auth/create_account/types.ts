import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { StyleSheet } from "react-native/types";
import { AuthStackParamList } from "../../../navigators/auth/types";

type CreateAccountScreenProps = NativeStackScreenProps<AuthStackParamList, "create_account">;

export default CreateAccountScreenProps;

export type CreateAccountScreenStylesType = {
    Screen: ReturnType<typeof StyleSheet.create>;
    TitleSection: ReturnType<typeof StyleSheet.create>;
    ContentsSection: ReturnType<typeof StyleSheet.create>;
    AccountInputSection: ReturnType<typeof StyleSheet.create>;
    BlankSection: ReturnType<typeof StyleSheet.create>;
    //SocialLoginSection: ReturnType<typeof StyleSheet.create>;
};