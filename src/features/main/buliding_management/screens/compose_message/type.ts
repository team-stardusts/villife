import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import { StyleSheet } from "react-native";

type NoticeRegisterScreenProps = NativeStackScreenProps<VillifeStackParamList, "noti_register">;

export type UseNoticeRegisterScreenStylesType = ReturnType<typeof StyleSheet.create>;

export default NoticeRegisterScreenProps;
