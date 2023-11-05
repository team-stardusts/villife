import { Response } from "../../../../../../libs/rest_apis/types";
import ALoginManager from "../../absc";
import DotEnv from "../../../../../../libs/dotenv";
import { LoginServiceResult } from "../../types";
import appleAuth from "@invertase/react-native-apple-authentication";

class AppleLoginManager extends ALoginManager {
    private env: DotEnv = new DotEnv();

    public async login(): Promise<LoginServiceResult | null> {
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
            .catch(() => {
                return null;
            });

        if (appleAuthRequestResponse === null) return null;
        if (appleAuthRequestResponse.authorizationCode === null) return null;

        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
            return await this._api.socialLogin("apple", appleAuthRequestResponse.authorizationCode);
        }

        return null;
    }

    public async logout(): Promise<boolean> {
        return await this._api.logout();
    }
    public async refresh(): Promise<any> {}

    public async join(params: void): Promise<void> {
        return Promise.resolve(params);
    }
}

export default AppleLoginManager;
