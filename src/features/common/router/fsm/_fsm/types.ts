import { UserInfo } from "../../../hooks/service/user_info/types";

export interface RouteFSMBase {
    loading: LoadingState;
    situation: Situation;

    onAccessIntoApp(): void;
    onLogin(userinfo: UserInfo): this;
    onLoginFailed(): void;
    onChangeSituation(): void;
}

export enum Situation {
    NORMAL,
    NO_BUILDING,
    NO_ROOM,
    LOGGIN_FAILED,
    LOGGED_OUT,
}

export enum LoadingState {
    BUSY,
    IDLE,
}
