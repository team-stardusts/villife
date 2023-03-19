import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import AREST from "../absc";
import routes from "./routes";
import { RoutesType } from "./routes/types";
import IVillifeRESTAPI, { CustomSocialLoginResultType, SocialJoinParamsType, SocialJoinResultType, SocialLoginHostType, SocialLoginResultType } from "./types";
import { Response } from "../types";


class Villife extends AREST implements IVillifeRESTAPI {
    requester: AxiosInstance = axios.create({
        baseURL: "http://192.168.0.36:8080",
        timeout: 1000,
        timeoutErrorMessage: "The request timed out.\
            Check the Stardusts server."
    });

    routes: RoutesType = routes;


    public async login(id: string, password: string): Promise<any> {
    }

    public async socialLogin(category: SocialLoginHostType, accessToken: string): Response<CustomSocialLoginResultType> {
        let route: string;
        
        switch(category) {
            case "naver":
                route = this.routes.naverSocialLogin;
            default:
                // Social login 추가 시 여기에 Route 추가
                route = this.routes.naverSocialLogin;
        };
        
        const result = await this.request<any, SocialLoginResultType>({
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
            isSuccessful: result.isSuccessful,
            data: data,
        }
    }

    public async join(): Promise<any> {
        
    }

    public async socialJoin(category: SocialLoginHostType, params: SocialJoinParamsType): Response<SocialJoinResultType> {
        let route: string;

        switch(category) {
            case "naver":
                route = this.routes.naverSocialJoin;
            default:
                // Social login 추가 시 여기에 Route 추가
                route = this.routes.naverSocialJoin;
        };

        return await this.request<any, SocialJoinResultType>({
            method: "post",
            url: route,
            data: params,
        });
    }
}

export default Villife;