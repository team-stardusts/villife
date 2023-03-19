import { OnCompleteParams } from "@actbase/react-daum-postcode/lib/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { AuthStackParamList } from "../../../navigators/auth/types";

type ParamList = {
    search_address: {},
}

type SearchAddressScreenProps = NativeStackScreenProps<ParamList, "search_address">;

export default SearchAddressScreenProps;