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
import useNoticeService from "../../services";
import VillifeToastMessage from "../../../../common/atoms/toast";

export default function NoticeRegisterScreen(props: NoticeRegisterScreenProps) {
    const styles = useNoticeRegisterScreenStyles();
    const service = useNoticeService();
    const content = useRef("");
    const title = useRef("");

    const isTitleEnabled = false;

    const [loading, setLoading] = React.useState(false);

    const onSubmit = async () => {
        setLoading(true);
        if (title.current == "" || content.current == "") {
            setLoading(false);
            return VillifeToastMessage.showBottomToast("info", "제목 또는 내용을 입력해주세요");
        }
        const param: CreateNoticeParams = {
            title: title.current,
            content: content.current,
            priority: 1,
            building_id: 3,
        };
        setLoading(false);

        const result = await service.registerNotice(param);
        if (result.isSuccessful) props.navigation.goBack();
        console.log("create notice result\n", result.data?.data);
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
                <NotiEditor contentRef={content} titleRef={title} isTitleEnabled={isTitleEnabled} />
            </SafeAreaView>
        </NavigationView>
    );
}
