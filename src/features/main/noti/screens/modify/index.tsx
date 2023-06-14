import { SafeAreaView } from "react-native-safe-area-context";
import React, { useRef } from "react";
import NoticeModifyScreenProps from "./type";
import NavigationView from "../../../../common/blocks/navigation";
import NotiEditor from "../../blocks/noti_editor";
import ModifyButton from "../../blocks/modify_button";
import useNoticeModifyScreenStyles from "./styles";
import { UpdateNoticeParams } from "../../../../../libs/rest_apis/villife/notice/types";
import useNoticeService from "../../services";
import VillifeToastMessage from "../../../../common/atoms/toast";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";

export default function NoticeModifyScreen(props: NoticeModifyScreenProps) {
    const styles = useNoticeModifyScreenStyles();
    const service = useNoticeService();
    const message = useScreenMessage();

    const content = useRef(props.route.params.content);
    const title = useRef(props.route.params.title);
    const isTitleEnabled = true;

    const [loading, setLoading] = React.useState(false);

    const onSubmit = async () => {
        setLoading(true);
        if (title.current == "" || content.current == "") {
            setLoading(false);
            return VillifeToastMessage.showBottomToast("info", "제목 또는 내용을 입력해주세요");
        }
        const param: UpdateNoticeParams = {
            title: title.current,
            content: content.current,
            priority: 1,
            building_id: 3,
            notice_id: props.route.params.notiID,
        };

        setLoading(false);

        const result = await service.updateNotice(param);
        if (result.isSuccessful)
            props.navigation.reset({
                index: 0,
                routes: [{ name: "noti_home" }],
            });
        console.log("create notice result\n", result.data?.data);
    };

    return (
        <NavigationView
            headerOptions={{
                title: message.messages.main.noti.screen_modify_title,
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
            <SafeAreaView style={styles.contentsWrapper}>
                <NotiEditor contentRef={content} titleRef={title} isTitleEnabled={isTitleEnabled} />
            </SafeAreaView>
        </NavigationView>
    );
}
