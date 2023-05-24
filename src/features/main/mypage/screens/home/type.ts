import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import { StyleSheet } from "react-native";

type MyPageHomeScreenProps = NativeStackScreenProps<VillifeStackParamList, "my_page">;

export type UseMyPageHomeScreenStylesType = ReturnType<typeof StyleSheet.create>;

export default MyPageHomeScreenProps;
