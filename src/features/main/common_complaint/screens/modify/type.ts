import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import { StyleSheet } from "react-native";

type CommonComplaintModifyScreenProps = NativeStackScreenProps<VillifeStackParamList, "common_complaint_modify">;

export type UseCommonComplaintModifyScreenStylesType = ReturnType<typeof StyleSheet.create>;

export default CommonComplaintModifyScreenProps;
