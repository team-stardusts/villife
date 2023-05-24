import NoticeHomeScreenProps from "./type";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import NavigationView from "../../../../common/blocks/navigation";
import useMyPageHomeScreenStyles from "./style";

export default function MyPageHomeScreen(props: NoticeHomeScreenProps) {
    const styles = useMyPageHomeScreenStyles();

    return (
        <NavigationView
            headerOptions={{
                title: "공지사항",
                shown: true,
                navComponentProps: {
                    name: "Hello!",
                },
            }}>
            <SafeAreaView style={styles.contentsWrapper}></SafeAreaView>
        </NavigationView>
    );
}
