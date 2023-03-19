import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import AREST from "../absc";
import { Respones } from "../types";
import routes from "./routes";
import { RoutesType } from "./routes/types";
import IKakaoRestAPI from "./types";
import KakaoLocal from "./types.local";

class Kakao extends AREST implements IKakaoRestAPI{
    readonly requester: AxiosInstance = axios.create({
        baseURL: "https://dapi.kakao.com/v2",
        headers: {
            Authorization: `KakaoAK ${"3dcb994b16bbe5e3684501ce8d4dc642"}`
        },
        timeout: 1000,
        timeoutErrorMessage: "The request timed out.\
            See the kakao rest API documentation..",
    });

    readonly routes: RoutesType = routes;
    
    public async searchAddress(params: KakaoLocal.SearchAddressParams): Respones<KakaoLocal.SearchAddress> {
        let route = this.routes.local.search.address;

        return await this.request<any, KakaoLocal.SearchAddress>({
            method: "get",
            url: route,
            params,
        })
    }
}

export default Kakao;