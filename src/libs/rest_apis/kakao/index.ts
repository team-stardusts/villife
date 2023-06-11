import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import DotEnv from "../../dotenv";
import AREST from "../absc";
import { Response } from "../types";
import routes from "./routes";
import { RoutesType } from "./routes/types";
import IKakaoRestAPI from "./types";
import KakaoLocal from "./types.local";

class KakaoServer extends AREST implements IKakaoRestAPI {
    private env: DotEnv = new DotEnv();

    readonly requester: AxiosInstance = axios.create({
        baseURL: this.env.api.kakao.REST_API_BASE_URL,
        headers: {
            Authorization: `KakaoAK ${this.env.api.kakao.REST_API_KEY}`,
        },
        timeout: 1000,
        timeoutErrorMessage:
            "The request timed out.\
            See the kakao rest API documentation..",
    });

    readonly routes: RoutesType = routes;

    public async searchAddress(params: KakaoLocal.SearchAddressParams): Response<KakaoLocal.SearchAddress> {
        let route = this.routes.local.search.address;

        return await this.request<any, KakaoLocal.SearchAddress>({
            method: "get",
            url: route,
            params,
        });
    }
}

export default KakaoServer;
