import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import { StyleSheet } from "react-native";

type NoticeHomeScreenProps = NativeStackScreenProps<VillifeStackParamList, "noti_home">;

export type UseNoticeHomeScreenStylesType = ReturnType<typeof StyleSheet.create>;

export default NoticeHomeScreenProps;
