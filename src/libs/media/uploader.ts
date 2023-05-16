import axios from "axios";
import NativeAlbum from "./album";
import VillifeServer from "../rest_apis/villife";
import { MediaUploadResult } from "../rest_apis/villife/media/types";

export interface MediaUploader {
    pickOneAndUpload(): Promise<MediaUploadResult>;
}

export default class ImageUploader implements MediaUploader {
    private mNativeAlbum = new NativeAlbum();
    private mApi = VillifeServer.getMediaManager();

    /**
     * @returns filename and server uri , if it failed return undefined as error
     */
    async pickOneAndUpload(): Promise<MediaUploadResult> {
        const uri = await this.mNativeAlbum.getImageURI().catch((reason) => {
            return Promise.reject(reason);
        });
        const formData = this.createFormDataFromImage(uri);
        console.log(formData);
        if (!formData) return Promise.reject(new Error("cannot create form Data"));
        const res = await this.mApi.uploadImage(formData);
        if (!res.data) return Promise.reject(new Error("upload failed err"));
        const result = res.data.data;
        result.uri = VillifeServer.getBaseURL() + result.uri;
        return result;
    }

    private createFormDataFromImage(imageUri: string): FormData | undefined {
        const formData = new FormData();
        const fileExtension = imageUri.split(".").pop();

        // file:///data/user/0/com.stardusts.villife/cache/rn_image_picker_lib_temp_56137727-e2fc-4d50-9fc3-32a78c68d824.jpg
        const formValue = {
            uri: imageUri,
            type: "image/jpeg",
            name: "image.jpg",
        };
        switch (fileExtension) {
            case "jpeg":
                formValue.type = "image/jpeg";
                formValue.name = imageUri.split("-").pop() || "defualt";
                break;
            case "jpg":
                formValue.type = "image/jpeg";
                formValue.name = imageUri.split("-").pop() || "defualt";
                break;
            case "png":
                formValue.type = "image/png";
                formValue.name = imageUri.split("-").pop() || "defualt";
                break;
            case "gif":
                formValue.type = "image/gif";
                formValue.name = imageUri.split("-").pop() || "defualt";
                break;
            case "webp":
                formValue.type = "image/webp";
                formValue.name = imageUri.split("-").pop() || "defualt";
                break;
            default:
                return undefined;
        }

        formData.append("image", formValue);

        return formData;
    }
}
