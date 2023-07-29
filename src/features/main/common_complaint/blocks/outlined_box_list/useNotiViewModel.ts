import React from "react";
import { NoticeListUpatedEventListener } from "./event";
import { GetNoticesResult } from "../../../../../libs/rest_apis/villife/notice/types";
import useNoticeService from "../../services";
import useUserBasicInfo from "../../../../common/hooks/service/_user_info";

export default function useCommonViewModel() {
    const service = useNoticeService();
    const user = useUserBasicInfo();
    const [notices, setNotices] = React.useState<GetNoticesResult>();
    const [refresh, setRefresh] = React.useState({});

    const getNotices = async () => {
        if (user?.adminInfomation?.selectedBuilding.id) {
            const result = await service.getNotices(user.adminInfomation.selectedBuilding.id);

            console.log("[NotiViewModel]Fetched notices count when user is admin : ", result.data?.data.length);
            if (result.isSuccessful) {
                setNotices(result.data?.data);
            }
        } else {
            if (user?.buildingID) {
                const result = await service.getNotices(user.buildingID);

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
        console.log("[]", user?.adminInfomation?.selectedBuilding);
        getNotices();
    }, [refresh, user?.adminInfomation?.selectedBuilding]);

    return notices;
}
