import React, { useRef } from "react";
import NavigationView from "../../../../common/blocks/navigation";
import VillifeToastMessage from "../../../../common/atoms/toast";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useStyler from "../../../../common/hooks/styler/hooks";
import Editor from "./blocks/editor";
import ComposeMessageScreenProps from "./type";
import SendButton from "./blocks/send_button";
import BuildingManagementServiceProvider from "../../services/building_rooms/provider";

export default function ComposeMessageScreen(props: ComposeMessageScreenProps) {
    const message = useScreenMessage();
    const content = useRef("");
    const title = useRef("");
    const { deviceUI, theme } = useStyler();
    const service = new BuildingManagementServiceProvider();

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
                title: "메세지 보내기",
                shown: true,
                hideBuidingSelector: true,
                backgroundColor: theme.color.specified.white,
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
