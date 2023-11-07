import React from "react";
import { ApprovalListUpatedEventListener } from "./event";
import useExpenseApprovalService from "../../services";
import { Approval } from "../../../../../../../libs/rest_apis/villife/approval/types";

export default function useExpenseApprovalViewModel() {
    const service = useExpenseApprovalService();
    const [approvals, setApprovals] = React.useState<ReadonlyArray<Approval>>([]);
    const [refresh, setRefresh] = React.useState({});

    const fetchApprovals = async () => {
        const fetchedApprovals = await service.getExpenseApproval();
        if (!fetchedApprovals.isSuccessful) return [];
        if (fetchedApprovals.data?.data) {
            console.log("[ExpenseApprovalViewModel] Fetched approval count :", fetchedApprovals.data?.data.length);
            setApprovals([]);
            setApprovals(fetchedApprovals.data?.data);
        } else {
            setApprovals([]);
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
