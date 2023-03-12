import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import routes from "./routes";
import { RoutesType } from "./routes/types";
import IVillifeRESTAPI, { CustomSocialLoginResultType, SocialJoinParamsType, SocialJoinResultType, SocialLoginHostType, SocialLoginResultType, VillifeResultType } from "./types";


class Villife implements IVillifeRESTAPI {
    requester: AxiosInstance = axios.create({
        baseURL: "http://192.168.0.36:8080",
        timeout: 1000,
        timeoutErrorMessage: "The request timed out.\
            Check the Stardusts server."
    });

    routes: RoutesType = routes;

    public async request<T>(config: AxiosRequestConfig): VillifeResultType<T> {
        return await this.requester(config)
            .then((res) => {
                return {
                    isSuccess: true,
                    data: res.data,
                }
            })
            .catch((err) => {
                return {
                    isSuccess: false,
                    data: err.response?.data,
                }
            });
    }

    public async login(id: string, password: string): Promise<any> {
    }

    public async socialLogin(category: SocialLoginHostType, accessToken: string): VillifeResultType<CustomSocialLoginResultType> {
        let route: string;
        
        switch(category) {
            case "naver":
                route = this.routes.naverSocialLogin;
            default:
                // Social login 추가 시 여기에 Route 추가
                route = this.routes.naverSocialLogin;
        };
        
        const result = await this.request<SocialLoginResultType>({
            method: "post",
            url: route,
            data: { access_token: accessToken }
        });
        
        const data = Object.assign({
            social: { access_token: accessToken },
        }, {
            stardusts: result.data,
        })
        
        return {
            isSuccess: result.isSuccess,
            data: data,
        }
    }

    public async join(): Promise<any> {
        
    }

    public async socialJoin(category: SocialLoginHostType, params: SocialJoinParamsType): VillifeResultType<SocialJoinResultType> {
        let route: string;

        switch(category) {
            case "naver":
                route = this.routes.naverSocialJoin;
            default:
                // Social login 추가 시 여기에 Route 추가
                route = this.routes.naverSocialJoin;
        };

        return await this.request<SocialJoinResultType>({
            method: "post",
            url: route,
            data: params,
        });
    }
}

export default Villife;