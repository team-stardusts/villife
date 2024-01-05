import appleAuth from "@invertase/react-native-apple-authentication";
import DotEnv from "../../../../../libs/dotenv";
import { SignInResult, Signer } from "./types";
import VillifeNativeClient from "../../../../../libs/villife-native-client";
import Villife from "../../../../../libs/villife-client/types";

const env = new DotEnv();

class AppleSigner implements Signer {
    private _api = new VillifeNativeClient().auth;

    public async signIn(): Promise<SignInResult> {
        // performs login request
        const appleAuthRequestResponse = await appleAuth
            .performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                // Note: it appears putting FULL_NAME first is important, see issue #293
                requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
            })
            .then((r) => {
                return r;
            })
            .catch((err) => {
                console.error(err);
                throw err;
            });

        if (appleAuthRequestResponse === null) {
            throw new Error("appleAuthRequestResponse is null.");
        }
        if (appleAuthRequestResponse.authorizationCode === null) {
            throw new Error("appleAuthRequestResponse.authorizationCode is null.");
        }

        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

        // use credentialState response to ensure the user is authenticated
        if (credentialState !== appleAuth.State.AUTHORIZED) {
            throw new Error("Apple credential state is not 'Authorized'.");
        }

        return await this._api.signInWithSocialMedia("apple", appleAuthRequestResponse.authorizationCode);
    }

    public async signOut(): Promise<any> {
        this._api.signOut();
    }

    public async signUp(params: Villife.Auth.PersonalInfoVerificationForm): Promise<any> {
        return this._api.verifyPersonalInfo(params);
    }
}

export default AppleSigner;
