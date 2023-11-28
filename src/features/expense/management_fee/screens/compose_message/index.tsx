import React, { useRef } from "react";
import NavigationView from "../../../../common/blocks/navigation";
import VillifeToastMessage from "../../../../common/atoms/toast";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useStyler from "../../../../common/hooks/styler/hooks";
import Editor from "./blocks/editor";
import SendButton from "./blocks/send_button";
import ExpenseComposeMessageScreenProps from "./type";
import ManagementFeePaymentServiceProvider from "../../services/provider";
import useUserInformation from "../../../../common/hooks/service/user_info";
import routes from "../../../../../libs/rest_apis/villife/routes";

export default function ExpenseComposeMessageScreen(props: ExpenseComposeMessageScreenProps) {
    const message = useScreenMessage();
    const content = useRef("");
    const title = useRef("");
    const service = new ManagementFeePaymentServiceProvider();
    const user = useUserInformation();

    const { deviceUI, theme } = useStyler();

    const [loading, setLoading] = React.useState(false);

    const onSubmit = async () => {
        console.log(user?.buildingID);
        setLoading(true);
        if (title.current == "" || content.current == "") {
            setLoading(false);
            return VillifeToastMessage.showBottomToast("info", message.messages.main.noti.noti_title_error);
        }
        let isSuccessful: boolean = false;
        if (user?.buildingID === undefined) {
            return;
        }
        const params = {
            title: title.current,
            content: content.current,
            room_number: props.route.params.room_number,
            building_id: user?.buildingID,
        };
        console.log(params);
        setLoading(false);
        const result = await service.sendPushMessage(params);
        console.log("[onSubmit]", result.isSuccessful);

        if (isSuccessful) {
            VillifeToastMessage.showBottomToast("error", "알림 성공");
            props.navigation.reset({
                index: 0,
                routes: [{ name: "management_fee" }],
            });
        } else {
            VillifeToastMessage.showBottomToast("error", "알림 실패");
            props.navigation.reset({
                index: 0,
                routes: [{ name: "management_fee" }],
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
