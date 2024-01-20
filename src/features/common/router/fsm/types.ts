import { UserInfo } from "../../hooks/service/user_info/types";

export interface RouteFiniteStateMachine {
    appState: VillifeAppState;
    loginState: VillifeLoginState;
    //linkingUrl: string | null;
    onAccessIntoApp(): void;
    onSignIn(userinfo: UserInfo | null): this;
    onChangeUserState(): void;
}

export enum VillifeLoginState {
    EXCEPTION, // common
    FAILED_TO_SIGN_IN, // common
    SIGN_OUT, // common
    NORMAL, // User only
    NO_BUILDING, // User only
    NO_ROOM, // User only
    REFRESHED, // common
}

export enum VillifeAppState {
    BUSY,
    IDLE,
}
