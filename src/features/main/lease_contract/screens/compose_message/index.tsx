import React, { useRef } from "react";
import NavigationView from "../../../../common/blocks/navigation";
import VillifeToastMessage from "../../../../common/atoms/toast";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useStyler from "../../../../common/hooks/styler/hooks";
import Editor from "./blocks/editor";
import ComposeMessageScreenProps from "./type";
import SendButton from "./blocks/send_button";

import useBuildingRoomContractor from "../../services/building_rooms";

export default function ComposeMessageScreen(props: ComposeMessageScreenProps) {
    const message = useScreenMessage();
    const content = useRef("");
    const title = useRef("");
    const { deviceUI, theme } = useStyler();
    const contractor = useBuildingRoomContractor();

    const [loading, setLoading] = React.useState(false);

    const onSubmit = async () => {
        setLoading(true);
        if (title.current == "" || content.current == "") {
            setLoading(false);
            return VillifeToastMessage.showBottomToast("info", message.messages.main.noti.noti_title_error);
        }
        let isSuccessful: boolean = false;
        const params = {
            title: title.current,
            content: content.current,
            contractID: props.route.params.contractID,
        };
        setLoading(false);
        isSuccessful = await contractor.requestNotification(params);
        if (isSuccessful) {
            VillifeToastMessage.showBottomToast("success", "알림 성공");
            props.navigation.reset({
                index: 0,
                routes: [{ name: "lease_contract" }],
            });
        } else {
            VillifeToastMessage.showBottomToast("error", "알림 실패");
            props.navigation.reset({
                index: 0,
                routes: [{ name: "lease_contract" }],
            });
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
