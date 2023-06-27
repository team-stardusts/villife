import { Response } from "../../types";
import AVillifeServerModule from "../absc";
import {
    Complaint,
    CreateReplyReqParams,
    GetBuildingComplaintsParams,
    GetRepliesResult,
    UpdateReplyReqParams,
} from "./types";
import {
    CreateComplaintParams,
    DeleteComplaintParams,
    GetComplaintsResult,
    GetUserComplaintsParams,
    IVillifeComplaintRestClient,
    UpdateComplaintParams,
} from "./types";

class VillifeComplaintRestClient extends AVillifeServerModule implements IVillifeComplaintRestClient {
    async CreateComplaint(params: CreateComplaintParams): Response<string> {
        let route: string = this.routes.complaint.createComplaint;

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: params,
        });
    }
    async GetOneComplaint(complaintID: number): Response<Complaint> {
        let route: string = this.routes.complaint.getOneComplaint + `?complaint_id=${complaintID}`;
        return await this.requestAuthable<any, Complaint>({
            method: "get",
            url: route,
        });
    }
    async GetUserComplaints(params: GetUserComplaintsParams): Response<GetComplaintsResult> {
        const qurey = `?status=${params.status}`;
        let route: string = this.routes.complaint.getUserComplaints + qurey;

        return await this.requestAuthable<any, GetComplaintsResult>({
            method: "get",
            url: route,
        });
    }
    async GetBuildingComplaints(params: GetBuildingComplaintsParams): Response<GetComplaintsResult> {
        const qurey = `?status=${params.status}&building_id=${params.building_id}`;
        let route: string = this.routes.complaint.getBuildingComplaints + qurey;

        return await this.requestAuthable<any, GetComplaintsResult>({
            method: "get",
            url: route,
        });
    }
    async UpdateComplaint(params: UpdateComplaintParams): Response<string> {
        let route: string = this.routes.complaint.updateComplaint;

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: params,
        });
    }
    async DeleteComplaint(params: DeleteComplaintParams): Response<string> {
        let route: string = this.routes.complaint.deleteComplaint;

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: params,
        });
    }

    async CreateReply(params: CreateReplyReqParams): Response<string> {
        let route: string = this.routes.complaint.reply;

        var stringUris = "";
        params.image_uris.map((uri) => {
            stringUris += `${uri},`;
        });
        const convertedParams = {
            complaint_id: params.complaint_id,
            content: params.content,
            image_uris: stringUris,
        };
        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: convertedParams,
        });
    }

    async GetReplies(complaintID: number): Response<GetRepliesResult> {
        const query = `?complaint_id=${complaintID}`;
        let route: string = this.routes.complaint.reply + query;

        return await this.requestAuthable<any, GetRepliesResult>({
            method: "get",
            url: route,
        });
    }

    async UpdateReply(params: UpdateReplyReqParams): Response<string> {
        let route: string = this.routes.complaint.reply;

        var stringUris = "";
        params.image_uris.map((uri) => {
            stringUris += `${uri},`;
        });
        const convertedParams = {
            reply_id: params.reply_id,
            content: params.content,
            image_uris: stringUris,
        };
        return await this.requestAuthable<any, string>({
            method: "patch",
            url: route,
            data: convertedParams,
        });
    }

    async DeleteReply(replyID: number): Response<string> {
        const query = `?reply_id=${replyID}`;
        let route: string = this.routes.complaint.reply + query;

        return await this.requestAuthable<any, string>({
            method: "delete",
            url: route,
        });
    }
}

export default VillifeComplaintRestClient;
