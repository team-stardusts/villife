import { RichEditor } from "react-native-pell-rich-editor";
import { Response } from "../../../../libs/rest_apis/types";
import {
    AcceptApprovalParams,
    Approval,
    RejectApprovalParams,
    getApprovalsResult,
} from "../../../../libs/rest_apis/villife/approval/types";
import { RequestCotent1001 } from "../../../../libs/rest_apis/villife/approval/content_type";

export interface IApprovalService {
    getUserApproval(buildingID: number): Response<getApprovalsResult>;
    rejectUserApproval(params: RejectApprovalParams): Promise<Response<string>>;
    acceptUserApproval(params: AcceptApprovalParams): Promise<Response<string>>;
}
