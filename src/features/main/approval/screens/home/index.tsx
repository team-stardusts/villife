import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import NavigationView from "../../../../common/blocks/navigation";
import useApprovalHomeScreenStyles from "./style";
import ApprovaleHomeScreenProps from "./type";
import FlatListOutlinedContentsBox from "../../blocks/outlined_box_list";
import { Approval } from "../../../../../libs/rest_apis/villife/approval/types";

export default function ApprovalHomeScreen(props: ApprovaleHomeScreenProps) {
    const styles = useApprovalHomeScreenStyles();

    const [approvals, setApprovals] = useState<ReadonlyArray<Approval>>([]);
    const fetchApprovals = () => {
        // 비동기적으로 데이터를 가져옵니다. (시뮬레이션)
        const fetchedApprovals: ReadonlyArray<Approval> = [
            {
                id: 1,
                category: 1,
                detail_type: 1,
                createAt: "2023-05-24",
                content: {
                    title: "신규 가입",
                    subTitle: "정보 확인 후 수정사항 없을 시 수락 부탁드립니다.",
                    buildingName: "그린파크",
                    roomNumber: 501,
                    userId: "xkseh5424",
                    userName: "최태성",
                    userPhoneNumber: "01088457517",
                },
            },
            {
                id: 2,
                category: 2,
                detail_type: 1,
                createAt: "2023-05-24",
                content: {
                    vehicleNumber: "108라 8477",
                    vehicleModel: "BMW 320I",
                    title: "신규 가입",
                    subTitle: "정보 확인 후 수정사항 없을 시 수락 부탁드립니다.",
                    buildingName: "그린파크",
                    roomNumber: 501,
                },
            },
            // 다른 결재 데이터...
        ];

        // 상태를 업데이트합니다.
        setApprovals(fetchedApprovals);
    };

    // 컴포넌트가 마운트될 때 결재 데이터를 가져옵니다.
    useEffect(() => {
        fetchApprovals();
    }, []);

    return (
        <NavigationView
            headerOptions={{
                title: "승인함 ",
                shown: true,
                navComponentProps: {
                    name: "Hello!",
                },
            }}
            bottomNavOptions={{ shown: false }}>
            <SafeAreaView style={styles.contentsWrapper}>
                <FlatListOutlinedContentsBox approvals={approvals} />
            </SafeAreaView>
        </NavigationView>
    );
}
