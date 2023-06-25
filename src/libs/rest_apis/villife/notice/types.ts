import { Response } from "../../types";

export interface Noticealbe {
    getNotices(buildingID: number): Response<GetNoticesResult>;
    createNotice(params: CreateNoticeParams): Response<string>;
    updateNotice(params: UpdateNoticeParams): Response<string>;
    deleteNotice(params: DeleteNoticeParams): Response<string>;
}
// 1 : red, 2 : green, 3 : gray
export type ContentPriority = number;

export type CreateNoticeParams = {
    title: string;
    content: string;
    priority: ContentPriority;
    building_id: number;
};

export type UpdateNoticeParams = {
    title: string;
    content: string;
    priority: ContentPriority;
    building_id: number;
    notice_id: number;
};

export type DeleteNoticeParams = {
    building_id: number;
    notice_id: number;
};

export type Notice = {
    ID: number;
    Priority: ContentPriority;
    Title: string;
    Content: string;
    CreatedAt: string;
    UpdatedAt: string;
};

export type GetNoticesResult = Array<Notice>;

export default interface IVillifeNoticeManager extends Noticealbe {}
