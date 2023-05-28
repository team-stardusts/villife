import { useEffect, useRef, useState } from "react";
import { Keyboard, LayoutAnimation, ScrollView, Text, TextInput, View } from "react-native";
import { Complaint, GetRepliesResult } from "../../../../../libs/rest_apis/villife/complaint/types";
import { ComplaintListUpatedEventListener } from "../../services/event";
import useComplaintService from "../../services";

export function useComplaintDetailViewModel(complaintInfo: Complaint): ComplaintDetailUiState {
    const [replies, setReplies] = useState<GetRepliesResult>([]);
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
            service.GetReplies(complaintInfo.id).then((r) => {
                if (!r.isSuccessful) return;
                const resData = r.data?.data as GetRepliesResult;
                if (resData == null || resData == undefined) return;
                setReplies([...resData]);
            });
            Keyboard.dismiss();
        });

        return () => {
            listener.unsubscribe();
        };
    }, []);

    return {
        replies: replies,
    };
}

type ComplaintDetailUiState = {
    replies: GetRepliesResult;
    updatedComplaint?: Complaint;
};
