import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import { StyleSheet } from "react-native";

type NoticeModifyScreenProps = NativeStackScreenProps<VillifeStackParamList, "noti_modify">;

export type UseNoticeModifyScreenStylesType = ReturnType<typeof StyleSheet.create>;

export default NoticeModifyScreenProps;
