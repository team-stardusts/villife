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
    UploadAndInsertImage(ref: React.RefObject<RichEditor>): Promise<void | Error>;
    RegisterComplaint(content: string, title: string): Response<string>;
    UpdateComplaint(params: UpdateComplaintParams): Response<string>;
    GetOneComplaint(complaintID: number): Response<Complaint>;
    GetBuildingComplaints(params: GetBuildingComplaintsParams): Response<GetComplaintsResult>;
    GetUserComplaints(params: GetUserComplaintsParams): Response<GetComplaintsResult>;
    DeleteComplaint(params: DeleteComplaintParams): Response<string>;
    PickAndUploadImage(): Promise<MediaUploadResult>;
    CreateReply(complaintID: number, content: string, imageUris: Array<string>): Response<string>;
    UpdateReply(replyID: number, content: string, imageUris: Array<string>): Response<string>;
    GetReplies(complaintID: number): Response<GetRepliesResult>;
    DeleteReply(replyID: number): Response<string>;
}

export type Reply = {
    id: number;
    writer_name: string;
    content: string;
    image_uris: Array<string>;
    writted_at: string;
};
