import React, { useEffect, useRef } from "react";
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
        setLoading(true);
        if (title.current == "" || content.current == "") {
            setLoading(false);
            return VillifeToastMessage.showBottomToast("info", message.messages.main.noti.noti_title_error);
        }

        if (user?.adminInfomation?.selectedBuilding.id === undefined) {
            return;
        }

        const failedRooms: number[] = [];

        for (const roomNumber of props.route.params.room_numbers) {
            const params = {
                title: title.current,
                content: content.current,
                room_number: roomNumber,
                building_id: user?.adminInfomation?.selectedBuilding.id,
            };
            const result = await service.sendPushMessage(params);
            console.log("[ExpenseComposeMessageScreen]", result.data);

            if (!result.isSuccessful) {
                failedRooms.push(roomNumber);
            }
        }
        setLoading(false);

        if (failedRooms.length === 0) {
        }

        if (failedRooms.length === 0) {
            VillifeToastMessage.showBottomToast("success", "모든 알림이 성공적으로 전송되었습니다.");
            props.navigation.reset({
                index: 0,
                routes: [{ name: "management_fee" }],
            });
        } else {
            VillifeToastMessage.showBottomToast("error", `알림 전송에 실패한 방 번호: ${failedRooms.join(", ")}`);
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
