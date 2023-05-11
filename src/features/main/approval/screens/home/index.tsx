import NoticeHomeScreenProps from "./type";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import NavigationView from "../../../../common/blocks/navigation";
import useApprovalHomeScreenStyles from "./style";
import ApprovaleHomeScreenProps from "./type";
import FlatListOutlinedContentsBox from "../../../noti/blocks/outlined_box_list";

export default function ApprovalHomeScreen(props: ApprovaleHomeScreenProps) {
    const styles = useApprovalHomeScreenStyles();

    return (
        <NavigationView
            headerOptions={{
                title: "승인함 ",
                shown: true,
                navComponentProps: {
                    name: "Hello!",
                },
            }}
            bottomNavOptions={{ shown: false }}>
            <SafeAreaView style={styles.contentsWrapper}>
                <FlatListOutlinedContentsBox />
            </SafeAreaView>
        </NavigationView>
    );
}
