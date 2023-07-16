import React from "react";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import { ApprovalListUpatedEventListener } from "./event";
import { GetNoticesResult } from "../../../../../libs/rest_apis/villife/notice/types";
import useNoticeService from "../../services";
import useUserInfoService from "../../../../common/hooks/service/user_info";
import useApprovalService from "../../services";
import { Approval } from "../../../../../libs/rest_apis/villife/approval/types";

export default function useApprovalViewModel() {
    const service = useApprovalService();
    const [approvals, setApprovals] = React.useState<ReadonlyArray<Approval>>([]);
    const [refresh, setRefresh] = React.useState({});

    const fetchApprovals = async () => {
        console.log("[ApprovalViewModel] Fetching approvals ...");
        const fetchedApprovals = await service.getUserApproval();
        if (!fetchedApprovals.isSuccessful) return [];
        if (fetchedApprovals.data?.data) {
            console.log("[ApprovalViewModel] Fetched approval count :", fetchedApprovals.data?.data.length);
            setApprovals([]);
            setApprovals(fetchedApprovals.data?.data);
        }
    };

    React.useEffect(() => {
        const listener = new ApprovalListUpatedEventListener();
        listener.subscribe(() => {
            setRefresh({});
        });
        return () => {
            listener.unsubscribe();
        };
    }, []);

    React.useEffect(() => {
        fetchApprovals();
    }, [refresh]);

    return approvals;
}
