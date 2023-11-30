namespace Villife {
    export type Response<T> = {
        isSuccessful: boolean;
        statusCode: number | undefined;
        //errorCode: number;
        data: T | undefined;
    };

    export type PromiseResponse<T> = Promise<Response<T>>;

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

export default Villife;
