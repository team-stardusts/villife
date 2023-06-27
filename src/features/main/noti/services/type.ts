import { RichEditor } from "react-native-pell-rich-editor";
import { Response } from "../../../../libs/rest_apis/types";

import { MediaUploadResult } from "../../../../libs/rest_apis/villife/media/types";
import {
    CreateNoticeParams,
    DeleteNoticeParams,
    GetNoticesResult,
    Notice,
    UpdateNoticeParams,
} from "../../../../libs/rest_apis/villife/notice/types";

export type NoticeInfo = Notice;

export interface INoticeService {
    uploadAndInsertImage(ref: React.RefObject<RichEditor>): Promise<void | Error>;
    registerNotice(params: CreateNoticeParams): Promise<Response<string>>;
    updateNotice(params: UpdateNoticeParams): Promise<Response<string>>;
    deleteNotice(params: DeleteNoticeParams): Promise<Response<string>>;
    pickAndUploadImage(): Promise<MediaUploadResult>;
    getNotices(buildingId: number): Response<GetNoticesResult>;
}
