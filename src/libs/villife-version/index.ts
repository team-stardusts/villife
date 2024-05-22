import VersionCheck from "react-native-version-check";
import { VillifeVersionCheck } from "./types";
import { Platform } from "react-native";
import DotEnv from "../dotenv";

class VillifeVersionChecker {
    static get localVersion(): string {
        return VersionCheck.getCurrentVersion();
    }

    static get packageName(): string {
        return VersionCheck.getPackageName();
    }

    public static async getStoreUrl(): Promise<string> {
        return VersionCheck.getStoreUrl({
            appID: Platform.OS === "ios" ? new DotEnv().app.APP_STORE_APP_ID : undefined,
            packageName: this.packageName,
        });
    }

    public static async getUpstreamVersion(): Promise<string> {
        return VersionCheck.getLatestVersion({
            country: "KR",
            packageName: this.packageName,
        });
    }

    public static async needToUpdate(): Promise<any> {
        return VersionCheck.needUpdate({
            depth: 2, // 1.0.0 => 1.0
            latestVersion: await this.getUpstreamVersion(),
        });
    }
}

const villifeVersion: VillifeVersionCheck = VillifeVersionChecker as VillifeVersionCheck;

export default villifeVersion;
