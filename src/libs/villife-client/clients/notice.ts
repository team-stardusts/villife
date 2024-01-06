import VillifeClientCommon from "../absc";
import Villife from "../types";

class VillifeNoticeClient extends VillifeClientCommon implements Villife.Notice.Client {
    /**
     * @param NoticeCreationForm
     * @warn olny admin can use this api, should check authority before invoke this api
     */
    public async createNotice(params: Villife.Notice.NoticeCreationForm): Promise<string> {
        return await this.requestWithCredential({
            method: "post",
            url: this._routes.notice.createNotice,
            data: params,
        });
    }

    /**
     * @param NoticeDeletionForm
     * @warn olny admin can use this api, should check authority before invoke this api
     */
    public async deleteNotice(params: Villife.Notice.NoticeDeletionForm): Promise<string> {
        return await this.requestWithCredential({
            method: "post",
            url: this._routes.notice.deleteNotice,
            data: params,
        });
    }

    public async getNotices(buildingId: number): Promise<Villife.Notice.Notice[]> {
        return await this.requestWithCredential({
            method: "get",
            url: this._routes.notice.deleteNotice,
            params: {
                buildingId,
            },
        });
    }

    /**
     * @param UpdateNoticeParams
     * @warn olny admin can use this api, should check authority before invoke this api
     */
    public async updateNotice(params: Villife.Notice.NoticeUpdateForm): Promise<string> {
        return await this.requestWithCredential({
            method: "post",
            url: this._routes.notice.updateNotice,
            data: params,
        });
    }
}

export default VillifeNoticeClient;
