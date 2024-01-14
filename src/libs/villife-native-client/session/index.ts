import { Villife } from "@team-stardusts/villife-client";
import VillifeStorage from "../../storage";
import LoginTable from "../../storage/tables/login";

class VillifeSessionAdaptor implements Villife.Utility.SessionStorage {
    private readonly _storage: LoginTable;

    constructor() {
        this._storage = VillifeStorage.getInstance().login;
    }

    public async getTokens(): Promise<Villife.Utility.Tokens | null> {
        const loginData = await this._storage.get();

        if (loginData === null) return null;
        return {
            accessToken: loginData.accessToken,
            refreshToken: loginData.refreshToken,
        };
    }

    public async setTokens(tokens: Villife.Utility.Tokens): Promise<boolean> {
        const loginData = await this._storage.get();

        if (loginData === null) return false;

        return await this._storage.set({
            ...loginData,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        });
    }

    public async clearTokens(): Promise<void> {
        await this._storage.remove();
    }
}

export default VillifeSessionAdaptor;
