import { RichEditor } from "react-native-pell-rich-editor";
import { Response } from "../../../../libs/rest_apis/types";
import {
    Complaint,
    DeleteComplaintParams,
    GetBuildingComplaintsParams,
    GetComplaintsResult,
    GetRepliesResult,
    GetUserComplaintsParams,
    UpdateComplaintParams,
} from "../../../../libs/rest_apis/villife/complaint/types";
import { MediaUploadResult } from "../../../../libs/rest_apis/villife/media/types";

export type ComplaintInfo = Complaint;

export interface IComplaintService {
    uploadAndInsertImage(ref: React.RefObject<RichEditor>): Promise<void | Error>;
    registerComplaint(content: string, title: string): Response<string>;
    updateComplaint(params: UpdateComplaintParams): Response<string>;
    getOneComplaint(complaintID: number): Response<Complaint>;
    getBuildingComplaints(params: GetBuildingComplaintsParams): Response<GetComplaintsResult>;
    getUserComplaints(params: GetUserComplaintsParams): Response<GetComplaintsResult>;
    deleteComplaint(params: DeleteComplaintParams): Response<string>;
    pickAndUploadImage(): Promise<MediaUploadResult>;
    createReply(complaintID: number, content: string, imageUris: Array<string>): Response<string>;
    updateReply(replyID: number, content: string, imageUris: Array<string>): Response<string>;
    getReplies(complaintID: number): Response<GetRepliesResult>;
    deleteReply(replyID: number): Response<string>;
}

export type Reply = {
    id: number;
    writer_name: string;
    content: string;
    image_uris: Array<string>;
    writted_at: string;
};
