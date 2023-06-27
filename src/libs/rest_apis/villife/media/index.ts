import { Response } from "../../types";
import AVillifeServerModule from "../absc";
import IVillifeMediaManager, { MediaUploadResult } from "./types";

class VillifeMediaManager extends AVillifeServerModule implements IVillifeMediaManager {
    public async uploadImage(formData: FormData): Response<MediaUploadResult> {
        let route: string = this.routes.media.uploadImage;

        return await this.requestAuthable<any, MediaUploadResult>({
            method: "post",
            url: route,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData,
        });
    }
}

export default VillifeMediaManager;
