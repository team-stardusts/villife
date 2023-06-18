import NoticeHomeScreenProps from "./type";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import NavigationView from "../../../../common/blocks/navigation";
import useMyPageHomeScreenStyles from "./style";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";

export default function MyPageHomeScreen(props: NoticeHomeScreenProps) {
    const styles = useMyPageHomeScreenStyles();
    const message = useScreenMessage();

    return (
        <NavigationView
            headerOptions={{
                title: message.messages.main.mypage.screen_title,
                shown: true,
                navComponentProps: {
                    name: "Hello!",
                },
            }}>
            <SafeAreaView style={styles.contentsWrapper}></SafeAreaView>
        </NavigationView>
    );
}
