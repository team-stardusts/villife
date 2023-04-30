import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native/types";
import { VillifeStackParamList } from "../../../common/router/types";

export type LoginScreenStylesType = {
    Screen: ReturnType<typeof StyleSheet.create>;
    LoginInputSection: ReturnType<typeof StyleSheet.create>;
    JoinLinkSection: ReturnType<typeof StyleSheet.create>;
};
type LoginScreenProps = NativeStackScreenProps<VillifeStackParamList> & {};

export default LoginScreenProps;
