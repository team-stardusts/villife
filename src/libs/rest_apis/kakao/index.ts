import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import routes from "./routes";
import { RoutesType } from "./routes/types";
import IKakaoRestAPI from "./types";

class Kakao implements IKakaoRestAPI{
    readonly requester: AxiosInstance = axios.create({
        baseURL: "https://dapi.kakao.com/v2",
        headers: {
            Authorization: `KakaoAK ${"KEY 입력 필요"}`
        },
        timeout: 1000,
        timeoutErrorMessage: "The request timed out.\
            See the kakao rest API documentation..",
    });

    readonly routes: RoutesType = routes;

    public async request(config: AxiosRequestConfig<any>) {
        return await this.requester(config)
            .then((res => {
                return res;
            }))
            .catch((err) => {
                return err.response;
            })
    }

    public async searchAddress(address: string): Promise<any> {
        let route = this.routes.local.search.address;

        await this.request({
            method: "get",
            url: route,
            params: {
                query: address,
            }
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }
}

export default Kakao;