import React from "react";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import { ApprovalListUpatedEventListener } from "./event";
import { getApprovalsResult } from "../../../../../libs/rest_apis/villife/approval/types";

export default function useApprovalViewModel() {
    const [approvals, setApprovals] = React.useState<getApprovalsResult>();
    const [refresh, setRefresh] = React.useState({});
    const getApprovals = async () => {
        const notifier = VillifeServer.getApprovalManager();
        const res = await notifier.getUserApprovals(3); //TODO : Should be changed to real building number which user belongs to
        console.log(res.data?.data);
        if (res.isSuccessful) {
            setApprovals(res.data?.data);
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
        getApprovals();
    }, [refresh]);

    return approvals;
}
