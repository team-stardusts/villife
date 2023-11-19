import { UserInfo } from "../../../hooks/service/user_info/types";

export interface RouteFSMBase {
    loading: LoadingState;
    situation: Situation;

    onAccessIntoApp(): void;
    onLogin(userinfo: UserInfo | null): this;
    onChangeSituation(situration?: Situation): void;
}

export enum Situation {
    EXCEPTION, // common
    LOGGIN_FAILED, // common
    LOGGED_OUT, // common
    NORMAL, // User only
    NO_BUILDING, // User only
    NO_ROOM, // User only
    REFRESHED, // common
}

export enum LoadingState {
    BUSY,
    IDLE,
}
