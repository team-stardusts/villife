import { Response } from "../../types";

export interface ImageUploadable {
    uploadImage(formData: FormData): Response<MediaUploadResult>;
}

export type MediaUploadResult = {
    file_name: string;
    uri: string;
};

export default interface IVillifeMediaManager extends ImageUploadable {}
