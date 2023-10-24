import React from "react";
import { ApprovalListUpatedEventListener } from "./event";
import useExpenseApprovalService from "../../services";

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

type Approval = {
    id: number;
    category: number;
    detail_type: number;
    create_at: number;
    updated_at: number;
    content: string;
};
