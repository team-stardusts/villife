namespace VillfeMedia {
    export interface Client {
        uploadImage(formData: FormData): Promise<UploadedMedia>;
    }

    export type UploadedMedia = {
        fileName: string;
        uri: string;
    };
}

export default VillfeMedia;
