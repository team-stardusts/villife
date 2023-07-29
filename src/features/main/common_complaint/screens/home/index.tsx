import React from "react";
import NavigationView from "../../../../common/blocks/navigation";
import WriteButton from "../../blocks/write_button";
import FlatListOutlinedContentsBox from "../../blocks/outlined_box_list";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import CommonComplaintHomeScreenProps from "./type";
import useUserInformation from "../../../../common/hooks/service/user_info";

export default function CommonComplaintHomeScreen(props: CommonComplaintHomeScreenProps) {
    const message = useScreenMessage();
    const user = useUserInformation();

    return (
        <NavigationView
            headerOptions={{
                title: message.messages.main.noti.screen_title,
                shown: true,
                navComponent: user?.isAdmin ? WriteButton : undefined,
            }}
            bodyOptions={{ applyDefaultHorizontalPadding: false, applyDefaultVerticalPadding: false }}
            bottomNavOptions={{ shown: false }}>
            <FlatListOutlinedContentsBox />
        </NavigationView>
    );
}
