import React from "react";
import NavigationView from "../../../../common/blocks/navigation";
import ApprovaleHomeScreenProps from "./type";
import FlatListOutlinedContentsBox from "../../blocks/outlined_box_list";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useApprovalHomeScreenStyles from "./style";

export default function ApprovalHomeScreen(props: ApprovaleHomeScreenProps) {
    const messages = useScreenMessage();
    const styles = useApprovalHomeScreenStyles();

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.approval.screen_title,
                style: {
                    backgroundColor: styles.nav.backgroundColor,
                },
                hideBuidingSelector: true,
            }}
            bodyOptions={{
                backgroundColor: styles.nav.backgroundColor,
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}
            bottomNavOptions={{ shown: false }}>
            <FlatListOutlinedContentsBox />
        </NavigationView>
    );
}
