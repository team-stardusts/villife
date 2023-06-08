import NoticeHomeScreenProps from "./type";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import NavigationView from "../../../../common/blocks/navigation";
import WriteButton from "../../blocks/write_button";
import useNoticeHomeScreenStyles from "./style";
import FlatListOutlinedContentsBox from "../../blocks/outlined_box_list";
import { View, Text } from "react-native";

export default function NoticeHomeScreen(props: NoticeHomeScreenProps) {
    const styles = useNoticeHomeScreenStyles();

    return (
        <NavigationView
            headerOptions={{
                title: "공지사항",
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
