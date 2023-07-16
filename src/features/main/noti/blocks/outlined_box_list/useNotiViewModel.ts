import React from "react";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import { NoticeListUpatedEventListener } from "./event";
import { GetNoticesResult } from "../../../../../libs/rest_apis/villife/notice/types";
import useNoticeService from "../../services";
import useUserInfoService from "../../../../common/hooks/service/user_info";

export default function useNotiViewModel() {
    const service = useNoticeService();
    const userInfo = useUserInfoService();
    const [notices, setNotices] = React.useState<GetNoticesResult>();
    const [refresh, setRefresh] = React.useState({});

    const getNotices = async () => {
        if (userInfo.adminInfo?.selectedBuilding.id) {
            const result = await service.getNotices(userInfo.adminInfo?.selectedBuilding.id);

            console.log("[NotiViewModel]Fetched notices count when user is admin : ", result.data?.data.length);
            if (result.isSuccessful) {
                setNotices(result.data?.data);
            }
        } else {
            if (userInfo.basicInfo?.building_id) {
                const result = await service.getNotices(userInfo.basicInfo?.building_id);

                //console.log("noti Viewmodel Renter: ", result.data?.data);
                if (result.isSuccessful) {
                    setNotices(result.data?.data);
                }
            }
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
    }, [refresh, userInfo.adminInfo?.selectedBuilding]);

    return notices;
}
