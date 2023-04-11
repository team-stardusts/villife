import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { StyleSheet } from "react-native/types";
import { StackParamList } from "../../../router/types";

type PermissionRequestScreenProps = NativeStackScreenProps<StackParamList, "permission_request">;

export default PermissionRequestScreenProps;

export type PermissionRequestScreenStylesType = {
    Screen: ReturnType<typeof StyleSheet.create>;
    UserTypeIconSection: ReturnType<typeof StyleSheet.create>;
    InputsSection: ReturnType<typeof StyleSheet.create>;
    BlankSection: ReturnType<typeof StyleSheet.create>;
    //SocialLoginSection: ReturnType<typeof StyleSheet.create>;
};
