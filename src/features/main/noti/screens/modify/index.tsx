import React, { useRef } from "react";
import NoticeModifyScreenProps from "./type";
import NavigationView from "../../../../common/blocks/navigation";
import NotiEditor from "../../blocks/noti_editor";
import { UpdateNoticeParams } from "../../../../../libs/rest_apis/villife/notice/types";
import useNoticeService from "../../services";
import VillifeToastMessage from "../../../../common/atoms/toast";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useUserInformation from "../../../../common/hooks/service/user_info";
import useStyler from "../../../../common/hooks/styler/hooks";
import SimpleNavComponent from "../../../../common/blocks/navigation/header/navcomponent";

export default function NoticeModifyScreen(props: NoticeModifyScreenProps) {
    const user = useUserInformation();
    const service = useNoticeService();
    const message = useScreenMessage();
    const { theme } = useStyler();

    const content = useRef(props.route.params.content);
    const title = useRef(props.route.params.title);

    const onSubmit = async () => {
        if (title.current == "" || content.current == "") {
            return VillifeToastMessage.showBottomToast("info", message.messages.main.noti.noti_title_error);
        }
        if (user?.adminInfomation?.selectedBuilding.id) {
            const param: UpdateNoticeParams = {
                title: title.current,
                content: content.current,
                priority: props.route.params.priority,
                building_id: user.adminInfomation.selectedBuilding.id,
                notice_id: props.route.params.notiID,
            };

            const result = await service.updateNotice(param);
            if (result.isSuccessful)
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: "noti_home" }],
                });
            console.log("create notice result\n", result.data?.data);
        }
    };

    return (
        <NavigationView
            headerOptions={{
                title: message.messages.main.noti.screen_modify_title,
                shown: true,
                style: {
                    backgroundColor: theme.color.specified.white,
                },
                navComponent: SimpleNavComponent,
                navComponentProps: {
                    title: "수정하기",
                    onPress: () => onSubmit(),
                },
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
                backgroundColor: theme.color.specified.white,
            }}
            bottomNavOptions={{ shown: false }}>
            <NotiEditor contentRef={content} titleRef={title} mode={"modify"} />
        </NavigationView>
    );
}
