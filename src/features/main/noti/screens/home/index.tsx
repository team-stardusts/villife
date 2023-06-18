import NoticeHomeScreenProps from "./type";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import NavigationView from "../../../../common/blocks/navigation";
import WriteButton from "../../blocks/write_button";
import useNoticeHomeScreenStyles from "./style";
import FlatListOutlinedContentsBox from "../../blocks/outlined_box_list";
import { View, Text } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useUserInfoService from "../../../../common/hooks/service/user_info";
import { AUTHORITY } from "../../../../common/hooks/service/user_info/constant";

export default function NoticeHomeScreen(props: NoticeHomeScreenProps) {
    const message = useScreenMessage();
    const userInfo = useUserInfoService();

    return (
        <NavigationView
            headerOptions={{
                title: message.messages.main.noti.screen_title,
                shown: true,
                navComponent: userInfo.basicInfo?.authority == AUTHORITY.ADMIN ? WriteButton : undefined,
                navComponentProps: {
                    name: "Hello!",
                },
            }}
            bodyOptions={{ applyDefaultHorizontalPadding: false, applyDefaultVerticalPadding: false }}
            bottomNavOptions={{ shown: false }}>
            <FlatListOutlinedContentsBox />
        </NavigationView>
    );
}
