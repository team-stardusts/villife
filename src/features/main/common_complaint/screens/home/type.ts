import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import { StyleSheet } from "react-native";

type CommonComplaintHomeScreenProps = NativeStackScreenProps<VillifeStackParamList, "common_complaint_home">;

export type UseCommonComplaintHomeScreenStylesType = ReturnType<typeof StyleSheet.create>;

export default CommonComplaintHomeScreenProps;
