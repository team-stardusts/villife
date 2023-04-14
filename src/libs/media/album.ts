import { Asset, launchImageLibrary } from "react-native-image-picker";

export default class NativeAlbum {
    async getImageURI(): Promise<string> {
        const res = await launchImageLibrary({ mediaType: "photo", selectionLimit: 1 }, undefined);

        const asset: Asset[] | undefined = res.assets;
        if (!asset) {
            return Promise.reject(new Error("cannot get image uri"));
        }
        console.log(asset[0].uri);
        return asset[0].uri!!;
    }
}
