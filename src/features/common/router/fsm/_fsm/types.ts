import { UserInfo } from "../../../hooks/service/user_info/types";

export interface RouteFSMBase {
    loading: LoadingState;
    situation: Situation;

    onAccessIntoApp(): void;
    onLogin(userinfo: UserInfo | null): this;
    onChangeSituation(): void;
}

export enum Situation {
    EXCEPTION,
    LOGGIN_FAILED,
    LOGGED_OUT,
    NORMAL,
    NO_BUILDING,
    NO_ROOM,
}

export enum LoadingState {
    BUSY,
    IDLE,
}
