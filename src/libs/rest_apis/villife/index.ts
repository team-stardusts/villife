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
import { IVillifeUserInfoRestClient } from "./user_info/types";
import VillifeUserInfoRestClient from "./user_info";
import { IVillifeComplaintRestClient } from "./complaint/types";
import VillifeComplaintRestClient from "./complaint";
import IVillifeMediaManager from "./media/types";
import VillifeMediaManager from "./media";

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
    static getComplaintRestClient(): IVillifeComplaintRestClient {
        return new VillifeComplaintRestClient();
    }
    static getUserInfoRestClient(): IVillifeUserInfoRestClient {
        return new VillifeUserInfoRestClient();
    }
    static getMediaManager(): IVillifeMediaManager {
        return new VillifeMediaManager();
    }

    static getBaseURL(): string {
        if (!env.api.villife.REST_API_BASE_URL) {
            throw new Error("cannotget env");
        }
        return env.api.villife.REST_API_BASE_URL;
    }
}

export default VillifeServer;
