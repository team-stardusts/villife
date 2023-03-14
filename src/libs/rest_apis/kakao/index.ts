import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import ARestApi from "../absc";
import { ResponesType } from "../types";
import routes from "./routes";
import { RoutesType } from "./routes/types";
import IKakaoRestAPI, {KakaoRespones as KR} from "./types";

class Kakao extends ARestApi implements IKakaoRestAPI{
    readonly requester: AxiosInstance = axios.create({
        baseURL: "https://dapi.kakao.com/v2",
        headers: {
            Authorization: `KakaoAK ${"KAKAO_API_KEY"}`
        },
        timeout: 1000,
        timeoutErrorMessage: "The request timed out.\
            See the kakao rest API documentation..",
    });

    readonly routes: RoutesType = routes;
    
    public async searchAddress(address: string): ResponesType<KR.Local.SearchAddressReturns> {
        let route = this.routes.local.search.address;

        return await this.request<any, KR.Local.SearchAddressReturns>({
            method: "get",
            url: route,
            params: {
                query: address,
            }
        })
    }
}

export default Kakao;