import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import { StyleSheet } from "react-native";

type ExpenseComposeMessageScreenProps = NativeStackScreenProps<VillifeStackParamList, "expense_compose_message">;

export type UseComposeMessageScreenStylesType = ReturnType<typeof StyleSheet.create>;

export default ExpenseComposeMessageScreenProps;
