import { Response } from "../../types";
import AVillifeServerModule from "../absc";
import { GetBuildingComplaintsParams } from "./types";
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
        let route: string = this.routes.createComplaint;

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: params,
        });
    }
    async GetUserComplaints(params: GetUserComplaintsParams): Response<GetComplaintsResult> {
        const qurey = `/?status=${params.status}`;
        let route: string = this.routes.getUserComplaints + qurey;

        return await this.requestAuthable<any, GetComplaintsResult>({
            method: "post",
            url: route,
        });
    }
    async GetBuildingComplaints(params: GetBuildingComplaintsParams): Response<GetComplaintsResult> {
        const qurey = `/?status=${params.status}&building_id=${params.building_id}`;
        let route: string = this.routes.getBuildingComplaints + qurey;

        return await this.requestAuthable<any, GetComplaintsResult>({
            method: "post",
            url: route,
        });
    }
    async UpdateComplaint(params: UpdateComplaintParams): Response<string> {
        let route: string = this.routes.updateComplaint;

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: params,
        });
    }
    async DeleteComplaint(params: DeleteComplaintParams): Response<string> {
        let route: string = this.routes.deleteComplaint;

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: params,
        });
    }
}

export default VillifeComplaintRestClient;
