import { RichEditor } from "react-native-pell-rich-editor";
import { Response } from "../../../../libs/rest_apis/types";
import {
    Complaint,
    DeleteComplaintParams,
    GetBuildingComplaintsParams,
    GetComplaintsResult,
    GetUserComplaintsParams,
    UpdateComplaintParams,
} from "../../../../libs/rest_apis/villife/complaint/types";

export type ComplaintInfo = Complaint;

export interface IComplaintService {
    UploadAndInsertImage(ref: React.RefObject<RichEditor>): Promise<void | Error>;
    RegisterComplaint(content: string, title: string): Promise<Response<string>>;
    UpdateComplaint(params: UpdateComplaintParams): Promise<Response<string>>;
    GetBuildingComplaints(params: GetBuildingComplaintsParams): Promise<Response<GetComplaintsResult>>;
    GetUserComplaints(params: GetUserComplaintsParams): Promise<Response<GetComplaintsResult>>;
    DeleteComplaint(params: DeleteComplaintParams): Promise<Response<string>>;
}
