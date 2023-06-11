import React from "react";
import { IComplaintService } from "./type";
import VillifeStorage from "../../../../libs/storage";
import {
    Complaint,
    GetBuildingComplaintsParams,
    GetComplaintsResult,
    GetRepliesResult,
    GetUserComplaintsParams,
    IVillifeComplaintRestClient,
    UpdateComplaintParams,
} from "../../../../libs/rest_apis/villife/complaint/types";
import VillifeServer from "../../../../libs/rest_apis/villife";
import ImageUploader, { MediaUploader } from "../../../../libs/media/uploader";
import { RichEditor } from "react-native-pell-rich-editor";
import { Response } from "../../../../libs/rest_apis/types";
import { err } from "react-native-svg/lib/typescript/xml";
import { DeleteComplaintParams } from "../../../../libs/rest_apis/villife/complaint/types";
import VillifeToastMessage from "../../../common/atoms/toast";
import { MediaUploadResult } from "../../../../libs/rest_apis/villife/media/types";

export default function useComplaintService(): IComplaintService {
    const service: IComplaintService = new ComplaintService();
    return service;
}

class ComplaintService implements IComplaintService {
    private mApi: IVillifeComplaintRestClient = VillifeServer.getComplaintRestClient();
    private mImageUploader: MediaUploader = new ImageUploader();

    async UploadAndInsertImage(ref: React.RefObject<RichEditor>): Promise<void | Error> {
        try {
            const result = await this.mImageUploader.pickOneAndUpload();
            ref.current?.insertHTML(
                `<div><img src="${result.uri}" alt="My Image" style="width: 25vh; height:25vh; object-fit:cover; border-radius: 10px;" ></div>`
            );
            console.log(ref);
        } catch (err) {
            return new Error("cannot upload image");
        }
    }

    async PickAndUploadImage(): Promise<MediaUploadResult> {
        try {
            const result = await this.mImageUploader.pickOneAndUpload();
            return result;
        } catch (err) {
            throw new Error("cannot upload image");
        }
    }

    async RegisterComplaint(content: string, title: string): Response<string> {
        const result = await this.mApi.CreateComplaint({ content: content, title: title });
        if (result.isSuccessful) VillifeToastMessage.showBottomToast("success", "민원 등록이 완료 되었어요!");
        else VillifeToastMessage.showBottomToast("error", "죄송합니다,민원 등록에 실패했어요");
        return result;
    }
    async UpdateComplaint(params: UpdateComplaintParams): Response<string> {
        const result = await this.mApi.UpdateComplaint(params);
        if (result.isSuccessful) VillifeToastMessage.showBottomToast("success", "민원 수정이 완료 되었어요!");
        else VillifeToastMessage.showBottomToast("error", "죄송합니다,민원 수정에 실패했어요");
        return result;
    }

    async GetOneComplaint(complaintID: number): Response<Complaint> {
        return await this.mApi.GetOneComplaint(complaintID);
    }

    async GetBuildingComplaints(params: GetBuildingComplaintsParams): Response<GetComplaintsResult> {
        if (params.building_id == 0) throw new Error("invalid building id");
        return await this.mApi.GetBuildingComplaints(params);
    }
    async GetUserComplaints(params: GetUserComplaintsParams): Response<GetComplaintsResult> {
        return await this.mApi.GetUserComplaints(params);
    }
    async DeleteComplaint(params: DeleteComplaintParams): Response<string> {
        return await this.mApi.DeleteComplaint(params);
    }

    async CreateReply(complaintID: number, content: string, imageUris: Array<string>): Response<string> {
        return await this.mApi.CreateReply({
            complaint_id: complaintID,
            content: content,
            image_uris: imageUris,
        });
    }
    async UpdateReply(replyID: number, content: string, imageUris: Array<string>): Response<string> {
        return await this.mApi.UpdateReply({
            reply_id: replyID,
            content: content,
            image_uris: imageUris,
        });
    }

    async GetReplies(complaintID: number): Response<GetRepliesResult> {
        return this.mApi.GetReplies(complaintID);
    }

    async DeleteReply(replyID: number): Response<string> {
        return this.mApi.DeleteReply(replyID);
    }
}
