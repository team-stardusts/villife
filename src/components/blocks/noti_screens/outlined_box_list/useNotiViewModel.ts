import React from "react";
import { ContentPriority } from "../box_label.tsx/type";
import VillifeServer from "../../../../libs/rest_apis/villife";
import { GetNoticesResult } from "../../../../libs/rest_apis/villife/types";
import { NoticeListUpatedEventListener } from "./event";

export default function useNotiViewModel() {
    const [notices, setNotices] = React.useState<GetNoticesResult>();
    const [refresh, setRefresh] = React.useState({});
    const getNotices = async () => {
        const api = new VillifeServer();
        const res = await api.getNotices(1); //TODO : Should be changed to real building number which user belongs to
        console.log(res.data?.data);
        if (res.isSuccessful) {
            setNotices(res.data?.data);
        }
    };

    React.useEffect(() => {
        const listener = new NoticeListUpatedEventListener();
        listener.subscribe(() => {
            setRefresh({});
        });
        return () => {
            listener.unsubscribe();
        };
    }, []);

    React.useEffect(() => {
        getNotices();
    }, [refresh]);

    return notices;
}
