import { Keyboard, View } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ComplaintModifyScreenProps from "./type";
import ComplaintEditor from "../../blocks/editor";
import { useRef } from "react";
import useComplaintService from "../../services";
import React from "react";
import VillifeToastMessage from "../../../../common/atoms/toast";
import { ComplaintEventEmitter } from "../../services/event";
import ComplaintEditButton from "../../blocks/edit_button";

export default function ComplaintModifyScreen({ navigation, route }: ComplaintModifyScreenProps) {
    const messages = useScreenMessage();
    const content = useRef(route.params.content);
    const title = useRef(route.params.title);
    const service = useComplaintService();
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async () => {
        setLoading(true);
        if (title.current == "" || content.current == "") {
            setLoading(false);
            return VillifeToastMessage.showBottomToast("info", "제목 또는 내용을 입력해주세요");
        }
        setLoading(false);
        const result = await service.UpdateComplaint({
            complaint_id: route.params.id,
            content: content.current,
            status: route.params.status,
            title: title.current,
        });
        if (result.isSuccessful) {
            Keyboard.dismiss();
            new ComplaintEventEmitter().emitListUpdatedEvent();
            navigation.goBack();
        }
    };

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.complaint.register,
                shown: true,
                navComponent: ComplaintEditButton,
                navComponentProps: {
                    onSubmit: () => {
                        onSubmit();
                    },
                    loading: loading,
                },
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}
            bottomNavOptions={{ shown: false }}>
            <ComplaintEditor titleRef={title} contentRef={content} mode="modify" />
        </NavigationView>
    );
}
