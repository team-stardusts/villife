import React from "react";
import useComplaintService from "../../services";
import useUserInfoService from "../../../../common/hooks/service/user_info";
import { ComplaintInfo } from "../../services/type";
import { ComplaintHomeDisplayMode } from "./types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";

export default function ComplaintHomeViewModel(): ComplaintHomeUiState {
    const service = useComplaintService();
    const userInfoService = useUserInfoService();
    const messages = useScreenMessage();
    const [complaints, setComplaints] = React.useState<Array<ComplaintInfo>>([]);
    const [displayMode, setDisplayMode] = React.useState<ComplaintHomeDisplayMode>("received_and_in_progress");
    const [menuTitle, setMenuTitle] = React.useState(
        messages.messages.main.complaint.complaint_received_and_in_progress
    );

    const fetchReceivedAndInProgressComplaint = async () => {
        const resReceived = await service.GetUserComplaints({
            status: "received",
        });
        if (!resReceived.isSuccessful) return [];
        const res = await service.GetUserComplaints({
            status: "in_progress",
        });
        if (!res.isSuccessful) return;
        if (res.data?.data) {
            const concatnatedComplaints = resReceived.data?.data.concat(...res.data.data);
            if (!concatnatedComplaints) return;
            setComplaints(concatnatedComplaints);
        }
    };
    const fetchReceivedComplaint = async () => {
        const res = await service.GetUserComplaints({
            status: "received",
        });
        if (!res.isSuccessful) return [];
        if (res.data?.data) {
            setComplaints(res.data.data);
        }
    };
    const fetchInProgressComplaint = async () => {
        const res = await service.GetUserComplaints({
            status: "in_progress",
        });
        if (!res.isSuccessful) return;
        if (res.data?.data) {
            setComplaints(res.data.data);
        }
    };
    const fetchCompletedComplaint = async () => {
        const res = await service.GetUserComplaints({
            status: "completed",
        });
        if (!res.isSuccessful) return;
        if (res.data?.data) {
            setComplaints(res.data.data);
        }
    };

    React.useEffect(() => {
        switch (displayMode) {
            case "received_and_in_progress":
                fetchReceivedAndInProgressComplaint();
                setMenuTitle(messages.messages.main.complaint.complaint_received_and_in_progress);
                break;
            case "received":
                fetchReceivedComplaint();
                setMenuTitle(messages.messages.main.complaint.complaints_received);
                break;
            case "in_progress":
                fetchInProgressComplaint();
                setMenuTitle(messages.messages.main.complaint.complaints_in_progress);

                break;
            case "completed":
                fetchCompletedComplaint();
                setMenuTitle(messages.messages.main.complaint.complaints_done);
                break;
        }
    }, [displayMode]);

    return {
        uiState: {
            menuTitle: menuTitle,
            complaintsWillBeDisplayed: complaints,
        },
        setDisplayMode: (displayMode: ComplaintHomeDisplayMode) => {
            setDisplayMode(displayMode);
        },
    };
}

type ComplaintHomeUiState = {
    uiState: {
        menuTitle: string;
        complaintsWillBeDisplayed: Array<ComplaintInfo>;
    };
    setDisplayMode: (displayMode: ComplaintHomeDisplayMode) => void;
};
