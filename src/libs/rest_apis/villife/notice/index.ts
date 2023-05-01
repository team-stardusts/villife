import { Response } from "../../types";
import AVillifeServerModule from "../absc";
import IVillifeNoticeManager, {
    CreateNoticeParams,
    DeleteNoticeParams,
    GetNoticesResult,
    MediaUploadResult,
    UpdateNoticeParams,
} from "./types";

class VillifeNoticeManager extends AVillifeServerModule implements IVillifeNoticeManager {
    public async uploadImage(formData: FormData): Response<MediaUploadResult> {
        let route: string = this.routes.uploadImage;

        return await this.requestAuthable<any, MediaUploadResult>({
            method: "post",
            url: route,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData,
        });
    }

    public async getNotices(buildingID: number): Response<GetNoticesResult> {
        let route: string = this.routes.getNoticesByBuildingID + `?building_id=${buildingID}`;

        return await this.requestAuthable<any, GetNoticesResult>({
            method: "get",
            url: route,
        });
    }

    /**
     * @param CreateNoticeParams
     * @warn olny admin can use this api, should check authority before invoke this api
     */
    public async createNotice(params: CreateNoticeParams): Response<string> {
        let route: string = this.routes.createNotice;

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: params,
        });
    }
    /**
     * @param UpdateNoticeParams
     * @warn olny admin can use this api, should check authority before invoke this api
     */
    public async UpdateNotice(params: UpdateNoticeParams): Response<string> {
        let route: string = this.routes.updateNotice;

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: params,
        });
    }

    /**
     * @param DeleteNoticeParams
     * @warn olny admin can use this api, should check authority before invoke this api
     */
    public async deleteNotice(params: DeleteNoticeParams): Response<string> {
        let route: string = this.routes.deleteNotice;

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: params,
        });
    }
}

export default VillifeNoticeManager;
