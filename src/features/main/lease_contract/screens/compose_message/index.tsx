import React, { useRef } from "react";
import NavigationView from "../../../../common/blocks/navigation";
import VillifeToastMessage from "../../../../common/atoms/toast";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useStyler from "../../../../common/hooks/styler/hooks";
import Editor from "./blocks/editor";
import ComposeMessageScreenProps from "./type";
import SendButton from "./blocks/send_button";
import useRoomViewModel from "../../viewmodel/room";

export default function ComposeMessageScreen(props: ComposeMessageScreenProps) {
    const message = useScreenMessage();
    const content = useRef("");
    const title = useRef("");
    const { theme } = useStyler();
    const viewModel = useRoomViewModel();

    const [loading, setLoading] = React.useState(false);

    const resetAndToast = (isSuccessful: boolean) => {
        const message = isSuccessful ? "알림 성공" : "알림 실패";
        const toastType = isSuccessful ? "success" : "error";
        VillifeToastMessage.showBottomToast(toastType, message);
        props.navigation.reset({
            index: 0,
            routes: [{ name: "lease_contract" }],
        });
    };

    const onSubmit = async () => {
        if (viewModel === null) {
            VillifeToastMessage.showBottomToast("error", "예기치 않은 오류가 발생했습니다.");
            return;
        }

        setLoading(true);

        if (title.current == "" || content.current == "") {
            setLoading(false);
            return VillifeToastMessage.showBottomToast("info", message.messages.main.noti.noti_title_error);
        }

        if (props.route.params.contractID) {
            const params = {
                contractId: props.route.params.contractID,
                content: content.current,
                title: title.current,
            };
            setLoading(false);

            const isSuccessful = await viewModel.sendNotification(params);
            resetAndToast(isSuccessful);
        } else if (props.route.params.selectedRoom) {
            setLoading(false);

            let isSuccessful = true;

            for (const selectedRoom of props.route.params.selectedRoom) {
                const params = {
                    contractId: selectedRoom.contractInfo.contractID,
                    content: content.current,
                    title: title.current,
                };

                isSuccessful = await viewModel.sendNotification(params);
                if (!isSuccessful) break;
            }
            resetAndToast(isSuccessful);
        }
    };

    return (
        <NavigationView
            headerOptions={{
                title: "메세지 보내기",
                shown: true,
                hideBuidingSelector: true,
                style: {
                    backgroundColor: theme.color.specified.white,
                },
                navComponent: SendButton,
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
                backgroundColor: theme.color.specified.white,
            }}
            bottomNavOptions={{ shown: false }}>
            <Editor contentRef={content} titleRef={title} mode={"register"} />
        </NavigationView>
    );
}
