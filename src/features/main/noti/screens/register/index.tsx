import { SafeAreaView } from "react-native-safe-area-context";
import React, { useRef } from "react";
import NoticeRegisterScreenProps from "./type";
import NavigationView from "../../../../common/blocks/navigation";
import RegisterButton from "../../blocks/register_button";
import useNoticeRegisterScreenStyles from "./styles";
import { CreateNoticeParams } from "../../../../../libs/rest_apis/villife/notice/types";
import NotiEditor from "../../blocks/noti_editor";
import useNoticeService from "../../services";
import VillifeToastMessage from "../../../../common/atoms/toast";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";

export default function NoticeRegisterScreen(props: NoticeRegisterScreenProps) {
    const message = useScreenMessage();
    const content = useRef("");
    const title = useRef("");
    const service = useNoticeService();
    const styles = useNoticeRegisterScreenStyles();

    const [loading, setLoading] = React.useState(false);

    const onSubmit = async () => {
        setLoading(true);
        if (title.current == "" || content.current == "") {
            setLoading(false);
            return VillifeToastMessage.showBottomToast("info", message.messages.main.noti.noti_title_error);
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
                title: message.messages.main.noti.screen_register_title,
                shown: true,
                navComponent: RegisterButton,
                navComponentProps: {
                    onSubmit: () => {
                        onSubmit();
                    },
                    loading: loading,
                },
            }}
            bodyOptions={{ applyDefaultHorizontalPadding: false, applyDefaultVerticalPadding: false }}
            bottomNavOptions={{ shown: false }}>
            <NotiEditor contentRef={content} titleRef={title} mode={"register"} />
        </NavigationView>
    );
}
