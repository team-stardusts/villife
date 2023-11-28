import React from "react";
import useComplaintService from "../../services";
import { ComplaintInfo } from "../../services/type";
import { ComplaintHomeDisplayMode } from "./types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import { ComplaintListUpatedEventListener } from "../../services/event";
import useUserInformation from "../../../../common/hooks/service/user_info";

export default function ComplaintHomeViewModel(): ComplaintHomeUiState {
    const service = useComplaintService();
    const user = useUserInformation();
    const messages = useScreenMessage();

    const [complaints, setComplaints] = React.useState<Array<ComplaintInfo>>([]);
    const [displayMode, setDisplayMode] = React.useState<ComplaintHomeDisplayMode>("received_and_in_progress");
    const [menuTitle, setMenuTitle] = React.useState(
        messages.messages.main.complaint.complaint_received_and_in_progress
    );
    const [loading, setIsLoading] = React.useState(true);

    const fetchReceivedAndInProgressComplaint = async () => {
        //admin 로그인 시 할당 된 Building.id가 없는데 가져오는 문제 해결
        if (user?.isAdmin && user?.adminInfomation?.selectedBuilding.id == undefined) return;

        const resReceived = user?.isAdmin
            ? await service.getBuildingComplaints({
                  building_id: user.adminInfomation?.selectedBuilding.id || 0,
                  status: "received",
              })
            : await service.getUserComplaints({
                  status: "received",
              });
        if (!resReceived.isSuccessful) return [];
        const res = user?.isAdmin
            ? await service.getBuildingComplaints({
                  building_id: user.adminInfomation?.selectedBuilding.id || 0,
                  status: "in_progress",
              })
            : await service.getUserComplaints({
                  status: "in_progress",
              });
        if (!res.isSuccessful) return;
        if (res.data?.data) {
            const concatnatedComplaints = resReceived.data?.data.concat(...res.data.data);
            if (!concatnatedComplaints) return;
            setComplaints([]);
            setComplaints(concatnatedComplaints);
            setIsLoading(false);
        }
    };
    const fetchReceivedComplaint = async () => {
        const res = user?.isAdmin
            ? await service.getBuildingComplaints({
                  building_id: user.adminInfomation?.selectedBuilding.id || 0,
                  status: "received",
              })
            : await service.getUserComplaints({
                  status: "received",
              });
        if (!res.isSuccessful) return [];
        if (res.data?.data) {
            setComplaints([]);
            setComplaints(res.data.data);
            setIsLoading(false);
        }
    };
    const fetchInProgressComplaint = async () => {
        const res = user?.isAdmin
            ? await service.getBuildingComplaints({
                  building_id: user.adminInfomation?.selectedBuilding.id || 0,
                  status: "in_progress",
              })
            : await service.getUserComplaints({
                  status: "in_progress",
              });
        if (!res.isSuccessful) return;
        if (res.data?.data) {
            setComplaints([]);
            setComplaints(res.data.data);
            setIsLoading(false);
        }
    };
    const fetchCompletedComplaint = async () => {
        const res = user?.isAdmin
            ? await service.getBuildingComplaints({
                  building_id: user.adminInfomation?.selectedBuilding.id || 0,
                  status: "completed",
              })
            : await service.getUserComplaints({
                  status: "completed",
              });

        if (!res.isSuccessful) return;

        if (res.data?.data) {
            setComplaints(res.data.data);
            setIsLoading(false);
        }
    };
    const fetchComplaintByDisplayMode = async () => {
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
    };

    React.useEffect(() => {
        (async () => {
            setIsLoading(true);
            await fetchComplaintByDisplayMode().catch((r) => {
                console.log(r, "fetching compaints has been failed");

                return;
            });

            console.info("[ComplaintHomeViewModel] fetchComplaintsByDisplayMode()");
            console.log("[ComDis]", displayMode);
            console.log("[ComBuilding]", user?.adminInfomation?.selectedBuilding);
        })();
    }, [displayMode, user?.adminInfomation?.selectedBuilding]);

    React.useEffect(() => {
        const listener = new ComplaintListUpatedEventListener();
        listener.subscribe(() => {
            fetchComplaintByDisplayMode();
        });
        return () => listener.unsubscribe();
    }, []);

    return {
        uiState: {
            menuTitle: menuTitle,
            loading: loading,
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
        loading: boolean;
        complaintsWillBeDisplayed: Array<ComplaintInfo>;
    };

    setDisplayMode: (displayMode: ComplaintHomeDisplayMode) => void;
};
