import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import { StyleSheet } from "react-native";

type ComplaintDetailScreenProps = NativeStackScreenProps<VillifeStackParamList, "complaint_detail">;

export default ComplaintDetailScreenProps;
export type ComplaintDetailScreenStylesType = ReturnType<typeof StyleSheet.create>;