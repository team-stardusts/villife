import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { AuthStackParamList } from "../../../navigators/auth/types";

type SearchAddressScreenProps = NativeStackScreenProps<AuthStackParamList, "search_address">;

export default SearchAddressScreenProps;

export type SearchAddressScreenStylesType = {
    //Screen: ReturnType<typeof StyleSheet.create>;
    //InputsSection: ReturnType<typeof StyleSheet.create>;
    //BlankSection: ReturnType<typeof StyleSheet.create>;
    //SocialLoginSection: ReturnType<typeof StyleSheet.create>;
};