import NoticeHomeScreenProps from "./type";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import NavigationView from "../../../../common/blocks/navigation";
import WriteButton from "../../blocks/write_button";
import useNoticeHomeScreenStyles from "./style";
import FlatListOutlinedContentsBox from "../../blocks/outlined_box_list";
import { View, Text } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";

export default function NoticeHomeScreen(props: NoticeHomeScreenProps) {
    const message = useScreenMessage();

    return (
        <NavigationView
            headerOptions={{
                title: message.messages.main.noti.screen_title,
                shown: true,
                navComponent: WriteButton,
                navComponentProps: {
                    name: "Hello!",
                },
            }}
            bottomNavOptions={{ shown: false }}>
            <FlatListOutlinedContentsBox />
        </NavigationView>
    );
}
