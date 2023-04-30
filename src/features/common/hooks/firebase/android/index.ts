import { NativeModules } from "react-native";
import AFirebaseModule from "../absc";

class AndroidFirebaseModule extends AFirebaseModule {
    private readonly mNativeModule = NativeModules.FirebaseModule;

    check(): void {
        console.log(this.mNativeModule);
    }

    async getAccessToken(): Promise<string> {
        return await this.mNativeModule.getAccessToken();
    }
}

export default AndroidFirebaseModule;
