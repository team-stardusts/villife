import { firebase } from "@react-native-firebase/messaging";
import AFirebaseModule from "../absc";

class IosFirebaseModule extends AFirebaseModule {
    check(): void {
        console.log("ios!");
    }

    private async requestPermissionOfPushNoti(): Promise<boolean> {
        const authStatus = await firebase.messaging().requestPermission();
        const isEanbled =
            authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === firebase.messaging.AuthorizationStatus.PROVISIONAL;

        return isEanbled;
    }

    async getAccessToken(): Promise<string> {
        const enabled = await this.requestPermissionOfPushNoti();

        if (enabled) {
            return await firebase.messaging().getToken();
        } else {
            return "";
        }
    }
}

export default IosFirebaseModule;
