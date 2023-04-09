import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native/types";
import { LoginDataType } from "../../../../hooks/storage/tables/login/types";
import { StackParamList } from "../../../router/types";

export type LoginScreenStylesType = {
    Screen: ReturnType<typeof StyleSheet.create>;
    LoginInputSection: ReturnType<typeof StyleSheet.create>;
    JoinLinkSection: ReturnType<typeof StyleSheet.create>;
    //GreetingSection: ReturnType<typeof StyleSheet.create>;
    //SocialLoginSection: ReturnType<typeof StyleSheet.create>;
};
type LoginScreenProps = NativeStackScreenProps<StackParamList> & {};

export default LoginScreenProps;
