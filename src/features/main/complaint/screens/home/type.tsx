import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import { StyleSheet } from "react-native";

type ComplaintHomeScreenProps = NativeStackScreenProps<VillifeStackParamList, "complaint">;

export default ComplaintHomeScreenProps;

export type ComplaintHomeScreenStylesType = {
    Screen: ReturnType<typeof StyleSheet.create>;
};
