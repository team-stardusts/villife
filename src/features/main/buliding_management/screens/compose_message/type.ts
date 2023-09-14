import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import { StyleSheet } from "react-native";

type ComposeMessageScreenProps = NativeStackScreenProps<VillifeStackParamList, "compose_message">;

export type UseComposeMessageScreenStylesType = ReturnType<typeof StyleSheet.create>;

export default ComposeMessageScreenProps;
