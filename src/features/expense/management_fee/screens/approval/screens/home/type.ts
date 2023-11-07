import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../../../common/router/types";
import { StyleSheet } from "react-native";

type ExpenseApprovalScreenProps = NativeStackScreenProps<VillifeStackParamList, "expense_approval">;

export type UseExpenseApprovalScreenStylesType = ReturnType<typeof StyleSheet.create>;

export default ExpenseApprovalScreenProps;
