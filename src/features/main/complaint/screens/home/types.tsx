import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import { StyleSheet } from "react-native";
import { ComplaintInfo } from "../../services/type";

type ComplaintHomeScreenProps = NativeStackScreenProps<VillifeStackParamList, "complaint">;

export default ComplaintHomeScreenProps;

export type ComplaintHomeScreenStylesType = ReturnType<typeof StyleSheet.create>;

export type ComplaintHomeDisplayMode = ComplaintInfo["status"] | "received_and_in_progress";
