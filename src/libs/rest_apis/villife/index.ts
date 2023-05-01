import DotEnv from "../../dotenv";
import VillifeAuthManager from "./auth";
import VillifeNoticeManager from "./notice";
import IVillifeAuthManager from "./auth/types";
import IVillifeNoticeManager from "./notice/types";
import IVillifeBuildingManager from "./building/types";
import VillifeBuildingManager from "./building";
import IVillifeApprovalManager from "./approval/types";
import VillifeApprovalManager from "./approval";
import IVillifeParkingManager from "./parking/types";
import VillifeParkginManager from "./parking";

const env: DotEnv = new DotEnv();

class VillifeServer {
    static getAuthenticator(): IVillifeAuthManager {
        return new VillifeAuthManager();
    }

    static getNoticeManager(): IVillifeNoticeManager {
        return new VillifeNoticeManager();
    }

    static getBuildingManager(): IVillifeBuildingManager {
        return new VillifeBuildingManager();
    }

    static getApprovalManager(): IVillifeApprovalManager {
        return new VillifeApprovalManager();
    }

    static getParkingManager(): IVillifeParkingManager {
        return new VillifeParkginManager();
    }

    static getBaseURL(): string {
        if (!env.api.villife.REST_API_BASE_URL) {
            throw new Error("cannotget env");
        }
        return env.api.villife.REST_API_BASE_URL;
    }
}

export default VillifeServer;
