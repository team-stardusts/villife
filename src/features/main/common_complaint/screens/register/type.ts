import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import { StyleSheet } from "react-native";

type CommonComplaintRegisterScreenProps = NativeStackScreenProps<VillifeStackParamList, "common_complaint_register">;

export type UseCommonComplaintRegisterScreenStylesType = ReturnType<typeof StyleSheet.create>;

export default CommonComplaintRegisterScreenProps;
