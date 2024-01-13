import { Villife } from "@team-stardusts/villife-client";
import VillifeNativeClient from "../../../../../libs/villife-native-client";
import { SignInResult, Signer, VillifeSignInForm } from "./types";

class VillifeSigner implements Signer {
    private _api = new VillifeNativeClient().auth;

    public async signIn(params: VillifeSignInForm): Promise<SignInResult> {
        return this._api.signIn(params.id, params.password);
    }

    public async signOut(): Promise<any> {
        this._api.signOut();
    }

    public async signUp(params: Villife.Auth.SignUpForm): Promise<boolean> {
        return this._api.signUp(params);
    }
}

export default VillifeSigner;
