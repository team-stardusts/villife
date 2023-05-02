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
    building_id: string;
    status: ComplaintStatus;
};

export type Complaint = {
    id: number;
    content: string;
    status: ComplaintStatus;
    title: string;
    created_at: string;
    updated_at: string;
};
export type GetComplaintsResult = Array<Complaint>;

export type ComplaintStatus = "received" | "in_progress" | "completed";

export interface IComplaintRestClient {
    CreateComplaint(params: CreateComplaintParams): Response<string>;
    GetUserComplaints(params: GetUserComplaintsParams): Response<GetComplaintsResult>;
    GetBuildingComplaints(params: GetBuildingComplaintsParams): Response<GetComplaintsResult>;
    UpdateComplaint(params: UpdateComplaintParams): Response<string>;
    DeleteComplaint(params: DeleteComplaintParams): Response<string>;
}
