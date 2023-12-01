import { Builder } from "./types";

class RequestMiddleware implements Builder {
    [key: string]: (params: any) => this | any;

    public test() {
        return this;
    }
    public toSnake() {
        return this;
    }
}

class ResponseMiddleware implements Builder {
    [key: string]: (params: any) => this | any;

    public test() {
        return this;
    }

    public toCamel() {
        return this;
    }

    public judgeResponse(): string {
        // Is error -> throw new Villife~~Error(...)
        // Is expected response -> return response.data
        return "";
    }
}

export { RequestMiddleware, ResponseMiddleware };
