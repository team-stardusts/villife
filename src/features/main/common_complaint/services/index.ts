import React from "react";
import { INoticeService } from "./type";
import VillifeStorage from "../../../../libs/storage";
import VillifeServer from "../../../../libs/rest_apis/villife";
import ImageUploader, { MediaUploader } from "../../../../libs/media/uploader";
import { RichEditor } from "react-native-pell-rich-editor";
import { Response } from "../../../../libs/rest_apis/types";
import VillifeToastMessage from "../../../common/atoms/toast";
import { MediaUploadResult } from "../../../../libs/rest_apis/villife/media/types";
import IVillifeNoticeManager, {
    CreateNoticeParams,
    DeleteNoticeParams,
    GetNoticesResult,
    UpdateNoticeParams,
} from "../../../../libs/rest_apis/villife/notice/types";
import { NoticeEventEmitter } from "../blocks/outlined_box_list/event";
import useScreenMessage from "../../../common/hooks/multilingual/hooks";

export default function useNoticeService(): INoticeService {
    const service: INoticeService = new NoticeService();
    return service;
}

const message = useScreenMessage();

class NoticeService implements INoticeService {
    //private mStroage = VillifeStorage.getInstance();
    private mApi: IVillifeNoticeManager = VillifeServer.getNoticeManager();
    private mImageUploader: MediaUploader = new ImageUploader();

    async uploadAndInsertImage(ref: React.RefObject<RichEditor>): Promise<void | Error> {
        try {
            const result = await this.mImageUploader.pickOneAndUpload();
            ref.current?.insertHTML(
                `<div><img src="${result.uri}" alt="My Image" style="width: 25vh; height:25vh; object-fit:cover; border-radius: 10px;" ></div>`
            );
            console.log(ref);
        } catch (err) {
            return new Error("cannot upload image");
        }
    }

    async pickAndUploadImage(): Promise<MediaUploadResult> {
        try {
            const result = await this.mImageUploader.pickOneAndUpload();
            return result;
        } catch (err) {
            throw new Error("cannot upload image");
        }
    }

    async registerNotice(params: CreateNoticeParams): Promise<Response<string>> {
        const result = await this.mApi.createNotice(params);
        if (result.data?.status == 200) {
            new NoticeEventEmitter().emitListUpdatedEvent();
            VillifeToastMessage.showBottomToast("success", message.messages.main.noti.noti_sucess);
        } else VillifeToastMessage.showBottomToast("error", message.messages.main.noti.noti_error);
        console.log(result);
        return result;
    }

    async updateNotice(params: UpdateNoticeParams): Promise<Response<string>> {
        const result = await this.mApi.updateNotice(params);
        if (result.data?.status == 200) {
            new NoticeEventEmitter().emitListUpdatedEvent();
            VillifeToastMessage.showBottomToast("success", message.messages.main.noti.noti_sucess);
        } else VillifeToastMessage.showBottomToast("error", message.messages.main.noti.noti_error);
        return result;
    }
    async deleteNotice(params: DeleteNoticeParams): Promise<Response<string>> {
        return await this.mApi.deleteNotice(params);
    }
    async getNotices(buildingId: number): Response<GetNoticesResult> {
        if (buildingId == 0) throw new Error("invalid building id");
        return await this.mApi.getNotices(buildingId);
    }
}
