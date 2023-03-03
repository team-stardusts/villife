import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import routes from "./routes";
import { RoutesType } from "./routes/types";
import IStardustsRestAPI, { CustomSocialLoginResultType, SocialJoinParamsType, SocialJoinResultType, SocialLoginCompanyType, SocialLoginResultType, StardustsResultType } from "./types";


class StardustsRestAPI implements IStardustsRestAPI {
    requester: AxiosInstance = axios.create({
        baseURL: "http://192.168.0.36:8080",
    });

    routes: RoutesType = routes;

    public async request<T>(config: AxiosRequestConfig): StardustsResultType<T> {
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

    public async socialLogin(category: SocialLoginCompanyType, access_token: string): StardustsResultType<CustomSocialLoginResultType> {
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
            data: { access_token }
        });
        
        const data = Object.assign({
            social: {access_token},
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

    public async socialJoin(category: SocialLoginCompanyType, params: SocialJoinParamsType): StardustsResultType<SocialJoinResultType> {
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

export default StardustsRestAPI;