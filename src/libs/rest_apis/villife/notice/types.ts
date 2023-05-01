import { Response } from "../../types";

export interface ImageUploadable {
    uploadImage(formData: FormData): Response<MediaUploadResult>;
}

export interface Noticealbe {
    getNotices(buildingID: number): Response<GetNoticesResult>;
    createNotice(params: CreateNoticeParams): Response<string>;
    UpdateNotice(params: UpdateNoticeParams): Response<string>;
    deleteNotice(params: DeleteNoticeParams): Response<string>;
}

export type MediaUploadResult = {
    file_name: string;
    uri: string;
};

export type ContentPriority = 1 | 2 | 3;

export type CreateNoticeParams = {
    priority: ContentPriority;
    title: string;
    content: string;
    building_id: number;
};

export type UpdateNoticeParams = {
    priority: ContentPriority;
    title: string;
    content: string;
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

export default interface IVillifeNoticeManager extends ImageUploadable, Noticealbe {}
