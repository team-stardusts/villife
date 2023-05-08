import { SafeAreaView } from "react-native-safe-area-context";
import React, { useRef } from "react";
import NoticeModifyScreenProps from "./type";
import { UpdateNoticeParams } from "../../../../../libs/rest_apis/villife/types";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import Toast from "react-native-toast-message";
import NavigationView from "../../../../common/blocks/navigation";
import { NoticeEventEmitter } from "../../../../common/blocks/noti_screens/outlined_box_list/event";
import NotiEditor from "../../blocks/noti_editor";
import ModifyButton from "../../blocks/modify_button";

function NoticeModifyScreen(props: NoticeModifyScreenProps) {
    const content = useRef(props.route.params.content);
    const titile = useRef(props.route.params.title);
    const [loading, setLoading] = React.useState(false);
    const onSubmit = async () => {
        setLoading(true);

        const param: UpdateNoticeParams = {
            priority: 1,
            title: titile.current,
            content: content.current,
            building_id: 3,
            notice_id: props.route.params.notiID,
        };
        const notifier = VillifeServer.getNoticeManager();

        const reuslt = await notifier.UpdateNotice(param);
        setLoading(false);

        if (reuslt.data?.status == 200) {
            new NoticeEventEmitter().emitListUpdatedEvent();
            Toast.show({
                type: "success",
                text1: "공지사항 수정 완료",
                position: "bottom",
                visibilityTime: 1500,
                bottomOffset: 200,
            });
            console.log();
            props.navigation.reset({
                index: 0,
                routes: [{ name: "noti_home" }],
            });
        } else {
            Toast.show({
                type: "error",
                text1: `공지사항 수정 실패`,
                position: "bottom",
                visibilityTime: 1500,
                bottomOffset: 200,
            });
        }

        console.log("create notice result\n", reuslt.data?.data);
    };

    return (
        <NavigationView
            headerOptions={{
                title: "공지사항 수정",
                shown: true,
                navComponent: ModifyButton,
                navComponentProps: {
                    onSubmit: () => {
                        onSubmit();
                    },
                    loading: loading,
                },
            }}
            bottomNavOptions={{ shown: false }}>
            <SafeAreaView style={{ flex: 1 }}>
                <NotiEditor contentRef={content} titleRef={titile} />
            </SafeAreaView>
        </NavigationView>
    );
}

export default NoticeModifyScreen;
