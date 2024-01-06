namespace VillifeNotice {
    export interface Client {
        getNotices(buildingId: number): Promise<Notice[]>;
        createNotice(params: NoticeCreationForm): Promise<string>;
        updateNotice(params: NoticeUpdateForm): Promise<string>;
        deleteNotice(params: NoticeDeletionForm): Promise<string>;
    }

    export enum ContentPriority {
        Red = 1,
        Green,
        Gray,
    }

    export type Notice = {
        id: number;
        priority: ContentPriority;
        title: string;
        content: string;
        createdAt: string;
        updatedAt: string;
    };

    export type NoticeCreationForm = {
        buildingId: number;
        content: string;
        title: string;
        priority: ContentPriority;
    };

    export type NoticeUpdateForm = NoticeCreationForm & {
        noticeId: number;
    };

    export type NoticeDeletionForm = {
        buildingId: number;
        noticeId: number;
    };
}

export default VillifeNotice;
