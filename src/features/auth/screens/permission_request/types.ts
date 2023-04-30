import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { StyleSheet } from "react-native/types";
import { VillifeStackParamList } from "../../../common/router/types";

type PermissionRequestScreenProps = NativeStackScreenProps<VillifeStackParamList, "permission_request">;

export default PermissionRequestScreenProps;

export type PermissionRequestScreenStylesType = {
    Screen: ReturnType<typeof StyleSheet.create>;
    UserTypeIconSection: ReturnType<typeof StyleSheet.create>;
    InputsSection: ReturnType<typeof StyleSheet.create>;
    BlankSection: ReturnType<typeof StyleSheet.create>;
    //SocialLoginSection: ReturnType<typeof StyleSheet.create>;
};
