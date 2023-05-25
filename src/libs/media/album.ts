import { Asset, ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker";

export default class NativeAlbum {
    async getImageURI(): Promise<string> {
        
        const options: ImageLibraryOptions = {
            mediaType: "photo",
            maxWidth: 800,
            maxHeight: 800,
            selectionLimit: 1,
        };
        const res = await launchImageLibrary(options, undefined);

        const asset: Asset[] | undefined = res.assets;
        if (!asset) {
            return Promise.reject(new Error("cannot get image uri"));
        }
        console.log(asset[0].uri);
        return asset[0].uri!!;
    }
}
