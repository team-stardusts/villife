import { Authority as _Authority } from "./data/types";

namespace Villife {
    export type Authority = _Authority;

    export interface Client {}

    export type AsyncResponse<T> = Promise<Response<T>>;
    export type Response<T> = T;

    export type VanillaResponse<T> = {
        data: T | null;
        msg: string;
        errorCode: number;
    };

    export interface Refresher {
        refresh(params?: TokensForRefresh): AsyncResponse<RefreshedToken>;
    }

    export type RefreshedToken = {
        accessToken: string;
        expireAt: number;
    };

    export interface SessionStorage {
        getTokens(): Promise<Tokens | null>;
        setTokens(tokens: Tokens): Promise<boolean>;
        clearTokens(): Promise<void>;
    }

    export type Tokens = {
        accessToken: string;
        refreshToken: string;
    };

    export type TokensForRefresh = {
        expiredAccessToken: string;
        refreshToken: string;
    };
}

export type { Villife };
