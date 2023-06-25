import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import { StyleSheet } from "react-native";

type NoticeRegisterScreenProps = NativeStackScreenProps<VillifeStackParamList, "noti_register">;

export type UseNoticeRegisterScreenStylesType = ReturnType<typeof StyleSheet.create>;

export default NoticeRegisterScreenProps;

/* 
        const param: CreateNoticeParams = {
            title: title.current,
            content: content.current,
            priority: 1,
            building_id: 3,
        };

        const result = await service.registerNotice(param); */
