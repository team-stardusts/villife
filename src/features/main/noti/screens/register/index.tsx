import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import React, { useRef } from "react";
import NoticeRegisterScreenProps from "./type";
import { IconRecord, RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor";
import ImageUploader from "../../../../../libs/media/uploader";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import Toast from "react-native-toast-message";
import NavigationView from "../../../../common/blocks/navigation";
import RegisterButton from "../../blocks/register_button";
import NotiRegisterButtonProps from "../../blocks/register_button";
import useNoticeRegisterScreenStyles from "./styles";
import { CreateNoticeParams } from "../../../../../libs/rest_apis/villife/notice/types";
import NotiEditor from "../../blocks/noti_editor";
import { NoticeEventEmitter } from "../../blocks/outlined_box_list/event";

export default function NoticeRegisterScreen(props: NoticeRegisterScreenProps) {
    const styles = useNoticeRegisterScreenStyles();

    const content = useRef("");
    const titile = useRef("");
    const isTitleEnabled = false;

    const [loading, setLoading] = React.useState(false);
    const onSubmit = async () => {
        setLoading(true);

        const param: CreateNoticeParams = {
            priority: 1,
            title: titile.current,
            content: content.current,
            building_id: 3,
        };
        const api = VillifeServer.getNoticeManager();

        const reuslt = await api.createNotice(param);
        setLoading(false);

        if (reuslt.data?.status == 200) {
            new NoticeEventEmitter().emitListUpdatedEvent();
            Toast.show({
                type: "success",
                text1: "공지사항 등록 완료",
                position: "bottom",
                visibilityTime: 1500,
                bottomOffset: 200,
            });
            props.navigation.goBack();
        } else {
            Toast.show({
                type: "error",
                text1: `공지사항 등록 실패`,
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
                title: "공지사항 등록",
                shown: true,
                navComponent: RegisterButton,
                navComponentProps: {
                    onSubmit: () => {
                        onSubmit();
                    },
                    loading: loading,
                },
            }}
            bottomNavOptions={{ shown: false }}>
            <SafeAreaView style={styles.contentsWrapper}>
                <NotiEditor contentRef={content} titleRef={titile} isTitleEnabled={isTitleEnabled} />
            </SafeAreaView>
        </NavigationView>
    );
}
