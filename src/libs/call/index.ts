import { Alert, Linking } from "react-native";
import { TelephoneBase } from "./types";

class Telephone implements TelephoneBase {
    private async canOpenURL(to: string): Promise<boolean> {
        if (!(await Linking.canOpenURL(to))) {
            console.error("[Telephone]", `This url(${to}) can not be opened.`);
            return false;
        }

        return true;
    }

    public async call(to: string): Promise<boolean> {
        let _to = "tel:" + to.replace(/-/g, "");

        if (!this.canOpenURL(_to)) return false;

        if (await Linking.openURL(_to)) return true;

        return false;
    }

    public async message(to: string): Promise<boolean> {
        let _to = "sms:" + to.replace(/-/g, "");

        if (!this.canOpenURL(_to)) return false;

        if (await Linking.openURL(_to)) return true;

        return false;
    }
}

export default Telephone;
