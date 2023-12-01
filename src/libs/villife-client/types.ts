namespace Villife {
    export type Response<T> = {
        data: T;
    };

    export type ResponseBase<T> = {
        data: T | null;
        msg: string;
        errorCode: number;
    };

    export type AsyncResponse<T> = Promise<Response<T>>;

    export interface SessionTable {
        getTokens(): Promise<Tokens | null>;
        setTokens(tokens: Tokens): Promise<boolean>;
        clearTokens(): Promise<boolean>;
    }

    export type Tokens = {
        accessToken: string;
        refreshToken: string;
    };
}

export type { Villife };
