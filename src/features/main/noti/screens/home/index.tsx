import NoticeHomeScreenProps from "./type";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import FlatListOutlinedContentsBox from "../../../../common/blocks/noti_screens/outlined_box_list";
import NavigationView from "../../../../common/blocks/navigation";
import WriteButton from "../../blocks/write_button";
import useNoticeHomeScreenStyles from "./style";

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
            }}>
            <SafeAreaView style={styles.contentsWrapper}>
                <FlatListOutlinedContentsBox />
            </SafeAreaView>
        </NavigationView>
    );
}
