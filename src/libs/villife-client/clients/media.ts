import VillifeClientCommon from "../absc";
import Villife from "../types";

class VillifeMediaClient extends VillifeClientCommon implements Villife.Media.Client {
    public async uploadImage(formData: FormData): Promise<Villife.Media.UploadedMedia> {
        return this.requestWithCredential({
            method: "post",
            url: this._routes.media.uploadImage,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData,
        });
    }
}

export default VillifeMediaClient;
