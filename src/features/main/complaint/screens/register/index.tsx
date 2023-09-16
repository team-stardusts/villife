import { View } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ComplaintRegisterScreenProps from "./type";
import { useRef } from "react";
import ComplaintEditor from "../../blocks/editor";
import ComplaintReigsterButton from "../../blocks/register_button";
import React from "react";
import useComplaintService from "../../services";
import VillifeToastMessage from "../../../../common/atoms/toast";
import { ComplaintEventEmitter } from "../../services/event";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function ComplaintRegisterScreen({ navigation, route }: ComplaintRegisterScreenProps) {
    const messages = useScreenMessage();
    const content = useRef("");
    const title = useRef("");
    const service = useComplaintService();
    const { theme } = useStyler();
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async () => {
        setLoading(true);
        if (title.current == "" || content.current == "") {
            setLoading(false);
            return VillifeToastMessage.showBottomToast("info", "제목 또는 내용을 입력해주세요");
        }
        setLoading(false);
        const result = await service.registerComplaint(content.current, title.current);
        if (result.isSuccessful) {
            new ComplaintEventEmitter().emitListUpdatedEvent();
            navigation.goBack();
        }
    };

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.complaint.register,
                shown: true,
                navComponent: ComplaintReigsterButton,
                navComponentProps: {
                    onSubmit: () => {
                        onSubmit();
                    },
                    loading: loading,
                },
                style: {
                    backgroundColor: theme.color.specified.white,
                    borderBottomColor: theme.color.specified.white,
                },
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
                backgroundColor: theme.color.specified.white,
            }}
            bottomNavOptions={{ shown: false }}>
            <ComplaintEditor titleRef={title} contentRef={content} mode="register" />
        </NavigationView>
    );
}
