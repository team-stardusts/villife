import { useEffect, useRef, useState } from "react";
import { Keyboard, LayoutAnimation, ScrollView, Text, TextInput, View } from "react-native";
import { Complaint, GetRepliesResult } from "../../../../../libs/rest_apis/villife/complaint/types";
import { ComplaintListUpatedEventListener } from "../../services/event";
import useComplaintService from "../../services";

export function useComplaintDetailViewModel(complaintInfo: Complaint): ComplaintDetailUiState {
    const [replies, setReplies] = useState<GetRepliesResult>([]);
    const [complaint, setComplaint] = useState<Complaint>(complaintInfo);
    const service = useComplaintService();

    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

        service.GetReplies(complaintInfo.id).then((r) => {
            if (!r.isSuccessful) return;
            const resData = r.data?.data as GetRepliesResult;
            if (resData == null || resData == undefined) return;
            setReplies([...resData]);
        });
        const listener = new ComplaintListUpatedEventListener();

        listener.subscribe(() => {
            console.log("[ComplaintDetailViewModel] Refreshing complaint contents...");
            service.GetOneComplaint(complaintInfo.id).then((r) => {
                console.log("[ComplaintDetailViewModel] Refreshed complaint contents successfully");
                if (r.isSuccessful) {
                    if (r.data?.data) setComplaint(r.data?.data);
                }
            });

            service.GetReplies(complaintInfo.id).then((r) => {
                if (!r.isSuccessful) return;
                const resData = r.data?.data as GetRepliesResult;
                if (resData == null || resData == undefined) {
                    setReplies([]);
                    return;
                }
                console.log(
                    "[ComplaintDetailViewModel] Refreshed complaint replies successfully, replies count :",
                    resData.length
                );
                setReplies([...resData]);
            });
            Keyboard.dismiss();
        });

        return () => {
            listener.unsubscribe();
        };
    }, []);

    return {
        complaint: complaint,
        replies: replies,
    };
}

type ComplaintDetailUiState = {
    complaint: Complaint;
    replies: GetRepliesResult;
    updatedComplaint?: Complaint;
};
