import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import { StyleSheet } from "react-native";

type ApprovaleHomeScreenProps = NativeStackScreenProps<VillifeStackParamList, "approval_home">;

export type UseApprovalHomeScreenStylesType = ReturnType<typeof StyleSheet.create>;

export default ApprovaleHomeScreenProps;
