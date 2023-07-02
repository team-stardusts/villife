import VillifeServer from "../../../../../libs/rest_apis/villife";
import { LogoutServiceReturns } from "./types";

export default function useLogoutService(): LogoutServiceReturns {
    const authManager = VillifeServer.getAuthenticator();
    const logout = async (): Promise<boolean> => {
        console.log("Logged out");
        return await authManager.logout();
    };

    return { logout };
}
