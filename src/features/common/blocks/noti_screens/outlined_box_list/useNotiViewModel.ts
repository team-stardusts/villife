import React from "react";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import { GetNoticesResult } from "../../../../../libs/rest_apis/villife/types";
import { NoticeListUpatedEventListener } from "./event";

export default function useNotiViewModel() {
    const [notices, setNotices] = React.useState<GetNoticesResult>();
    const [refresh, setRefresh] = React.useState({});
    const getNotices = async () => {
        const notifier = VillifeServer.getNoticeManager();
        const res = await notifier.getNotices(3); //TODO : Should be changed to real building number which user belongs to
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
