import { AxiosResponse } from "axios";
import { Builder } from "./types";

class RequestMiddleware implements Builder {
    [key: string]: any | ((params: any) => this | any);

    private _response: AxiosResponse;

    constructor(response: AxiosResponse) {
        this._response = response;
    }

    public toSnake() {
        return this;
    }
}

class ResponseMiddleware implements Builder {
    [key: string]: any | ((params: any) => this | any);

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
