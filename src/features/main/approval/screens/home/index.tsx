import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import NavigationView from "../../../../common/blocks/navigation";
import ApprovaleHomeScreenProps from "./type";
import FlatListOutlinedContentsBox from "../../blocks/outlined_box_list";
import { Approval } from "../../../../../libs/rest_apis/villife/approval/types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useUserInfoService from "../../../../common/hooks/service/user_info";
import { VILLIFE_AUTHORITY } from "../../../../../libs/rest_apis/villife/absc";
import useApprovalService from "../../services";

export default function ApprovalHomeScreen(props: ApprovaleHomeScreenProps) {
    const messages = useScreenMessage();
    const userInfo = useUserInfoService();
    const service = useApprovalService();

    const [approvals, setApprovals] = useState<ReadonlyArray<Approval>>([]);
    //[TO-DO] : 리얼데이터로 변경해라

    const fetchApprovals = async () => {
        const fetchedApprovals = await service.getUserApproval();
        if (!fetchedApprovals.isSuccessful) return [];
        if (fetchedApprovals.data?.data) {
            setApprovals([]);
            setApprovals(fetchedApprovals.data?.data);
        }
    };

    /*     const fetchApprovals = () => {
        const fetchedApprovals: ReadonlyArray<Approval> = [
            {
                id: 1,
                category: 1,
                detail_type: 1,
                create_at: 20230524,
                updated_at: 20230525,
                content: {
                    title: "신규 가입",
                    sub_title: "정보 확인 후 수정사항 없을 시 수락 부탁드립니다.",
                    building_name: "그린파크",
                    room_number: 501,
                    user_id: "xkseh5424",
                    user_name: "최태성",
                    user_phone_number: "01088457517",
                },
            },
            {
                id: 2,
                category: 2,
                detail_type: 1,
                create_at: 20230524,
                updated_at: 20230525,
                content: {
                    vehicle_number: "108라 8477",
                    vehicle_model: "BMW 320I",
                    title: "차량 정보 등록",
                    sub_title: "정보 확인 후 수정사항 없을 시 수락 부탁드립니다.",
                    building_name: "그린파크",
                    room_number: 501,
                },
            },
        ];

        setApprovals(fetchedApprovals);
    }; */

    useEffect(() => {
        fetchApprovals();
    }, []);

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.approval.screen_title,
            }}
            bottomNavOptions={{ shown: false }}>
            <FlatListOutlinedContentsBox approvals={approvals} />
        </NavigationView>
    );
}
