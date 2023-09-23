import NoticeHomeScreenProps from "./type";
import React from "react";
import NavigationView from "../../../../common/blocks/navigation";
import FlatListOutlinedContentsBox from "../../blocks/outlined_box_list";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useUserInformation from "../../../../common/hooks/service/user_info";
import useNoticeHomeScreenStyles from "./style";
import SimpleNavComponent from "../../../../common/blocks/navigation/header/navcomponent";

export default function NoticeHomeScreen(props: NoticeHomeScreenProps) {
    const message = useScreenMessage();
    const user = useUserInformation();
    const styles = useNoticeHomeScreenStyles();

    return (
        <NavigationView
            headerOptions={{
                title: message.messages.main.noti.screen_title,
                navComponent: user?.isAdmin ? SimpleNavComponent : undefined,
                navComponentProps: {
                    title: "등록하기",
                    onPress: () => props.navigation.navigate("noti_register", {}),
                },
                style: {
                    backgroundColor: styles.navContainer.backgroundColor,
                },
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
                backgroundColor: styles.navContainer.backgroundColor,
            }}
            bottomNavOptions={{ shown: false }}>
            <FlatListOutlinedContentsBox />
        </NavigationView>
    );
}
