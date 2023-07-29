import React, { useRef } from "react";
import NoticeRegisterScreenProps from "./type";
import NavigationView from "../../../../common/blocks/navigation";
import RegisterButton from "../../blocks/register_button";
import NotiEditor from "../../blocks/noti_editor";
import VillifeToastMessage from "../../../../common/atoms/toast";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NotiRegisterModal from "../../blocks/noti_register_modal";

export default function NoticeRegisterScreen(props: NoticeRegisterScreenProps) {
    const message = useScreenMessage();
    const content = useRef("");
    const title = useRef("");

    const [loading, setLoading] = React.useState(false);
    const [editModalVisible, setEditModalVisible] = React.useState(false);

    const onSubmit = async () => {
        setLoading(true);
        if (title.current == "" || content.current == "") {
            setLoading(false);
            return VillifeToastMessage.showBottomToast("info", message.messages.main.noti.noti_title_error);
        }
        setLoading(false);
        setEditModalVisible(true);
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
            <NotiRegisterModal
                visible={editModalVisible}
                setVisible={setEditModalVisible}
                title={title.current}
                content={content.current}
                navigation={props.navigation}
            />
            <NotiEditor contentRef={content} titleRef={title} mode={"register"} />
        </NavigationView>
    );
}
