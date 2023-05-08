import React from "react";
import { IComplaintService } from "./type";
import VillifeStorage from "../../../../libs/storage";
import {
    GetBuildingComplaintsParams,
    GetComplaintsResult,
    GetUserComplaintsParams,
    IVillifeComplaintRestClient,
    UpdateComplaintParams,
} from "../../../../libs/rest_apis/villife/complaint/types";
import VillifeServer from "../../../../libs/rest_apis/villife";
import ImageUploader from "../../../../libs/media/uploader";
import { RichEditor } from "react-native-pell-rich-editor";
import { Response } from "../../../../libs/rest_apis/types";
import { err } from "react-native-svg/lib/typescript/xml";
import { DeleteComplaintParams } from "../../../../libs/rest_apis/villife/complaint/types";
import VillifeToastMessage from "../../../common/atoms/toast";

export default function useComplaintService(): IComplaintService {
    const service: IComplaintService = new ComplaintService();
    return service;
}

class ComplaintService implements IComplaintService {
    private mStroage = new VillifeStorage();
    private mApi: IVillifeComplaintRestClient = VillifeServer.getComplaintRestClient();
    private mImageUploader = new ImageUploader();

    async UploadAndInsertImage(ref: React.RefObject<RichEditor>): Promise<void | Error> {
        try {
            const result = await this.mImageUploader.pickOneAndUpload();
            ref.current?.insertImage(result.uri);
        } catch (err) {
            return new Error("cannot upload image");
        }
    }

    async RegisterComplaint(content: string, title: string): Promise<Response<string>> {
        const result = await this.mApi.CreateComplaint({ content: content, title: title });
        if (result.isSuccessful) VillifeToastMessage.showBottomToast("success", "민원 등록이 완료 되었어요!");
        else VillifeToastMessage.showBottomToast("error", "죄송합니다,민원 등록에 실패했어요");
        return result;
    }
    async UpdateComplaint(params: UpdateComplaintParams): Promise<Response<string>> {
        const result = await this.mApi.UpdateComplaint(params);
        if (result.isSuccessful) VillifeToastMessage.showBottomToast("success", "민원 등록이 완료 되었어요!");
        else VillifeToastMessage.showBottomToast("error", "죄송합니다,민원 등록에 실패했어요");
        return result;
    }
    async GetBuildingComplaints(params: GetBuildingComplaintsParams): Promise<Response<GetComplaintsResult>> {
        return await this.mApi.GetBuildingComplaints(params);
    }
    async GetUserComplaints(params: GetUserComplaintsParams): Promise<Response<GetComplaintsResult>> {
        return await this.mApi.GetUserComplaints(params);
    }
    async DeleteComplaint(params: DeleteComplaintParams): Promise<Response<string>> {
        return await this.mApi.DeleteComplaint(params);
    }
}
