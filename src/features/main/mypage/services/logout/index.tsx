import VillifeAuthManager from "../../../../../libs/rest_apis/villife/auth";
import { LogoutServiceReturns } from "./types";

export default function useLogoutService(): LogoutServiceReturns {
    const logout = async (): Promise<boolean> => {
        return await new VillifeAuthManager().logout();
    };

    return { logout };
}
