import { Response } from "../../types";

export type CreateComplaintParams = {
    content: string;
    title: string;
};

export type DeleteComplaintParams = {
    complaint_id: number;
};

export type UpdateComplaintParams = {
    complaint_id: number;
    content: string;
    status: ComplaintStatus;
    title: string;
};

export type GetUserComplaintsParams = {
    status: ComplaintStatus;
};
export type GetBuildingComplaintsParams = {
    building_id: number;
    status: ComplaintStatus;
};

export type Complaint = {
    id: number;
    content: string;
    status: ComplaintStatus;
    title: string;
    building_name: string;
    complainant_name: string;
    created_at: string;
    updated_at: string;
    phone_number: string;
};
export type GetComplaintsResult = Array<Complaint>;

export type ComplaintStatus = "received" | "in_progress" | "completed";

export interface IVillifeComplaintRestClient {
    createComplaint(params: CreateComplaintParams): Response<string>;
    getOneComplaint(complaintID: number): Response<Complaint>;
    getUserComplaints(params: GetUserComplaintsParams): Response<GetComplaintsResult>;
    getBuildingComplaints(params: GetBuildingComplaintsParams): Response<GetComplaintsResult>;
    updateComplaint(params: UpdateComplaintParams): Response<string>;
    deleteComplaint(params: DeleteComplaintParams): Response<string>;
    createReply(params: CreateReplyReqParams): Response<string>;
    getReplies(complaintID: number): Response<GetRepliesResult>;
    updateReply(params: UpdateReplyReqParams): Response<string>;
    deleteReply(replyID: number): Response<string>;
}

export type CreateReplyReqParams = {
    complaint_id: number;
    content: string;
    image_uris: Array<string>;
};

export type UpdateReplyReqParams = {
    reply_id: number;
    content: string;
    image_uris: Array<string>;
};

export type GetRepliesResult = Array<GetOneReplyResult>;

export type GetOneReplyResult = {
    id: number;
    writer_name: string;
    content: string;
    image_uris: string;
    writted_at: string;
};
