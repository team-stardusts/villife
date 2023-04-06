import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import AREST from '../absc';
import routes from './routes';
import {RoutesType} from './routes/types';
import IVillifeRESTAPI, {
  CustomSocialLoginResultType,
  RegisterFirebaseTokenResult,
  SocialJoinParamsType,
  SocialJoinResultType,
  SocialLoginHostType,
  SocialLoginResultType,
} from './types';
import {Responsable, Response} from '../types';
import DotEnv from '../../dotenv';

class VillifeServer extends AREST implements IVillifeRESTAPI {
  private env: DotEnv = new DotEnv();

  readonly requester: AxiosInstance = axios.create({
    baseURL: this.env.api.villife.REST_API_BASE_URL,
    timeout: 1000,
    timeoutErrorMessage:
      'The request timed out.\
            Check the Stardusts server.',
  });

  readonly routes: RoutesType = routes;

  public async login(id: string, password: string): Promise<any> {}

  public async socialLogin(
    category: SocialLoginHostType,
    accessToken: string,
  ): Response<CustomSocialLoginResultType> {
    let route: string;

    switch (category) {
      case 'naver':
        route = this.routes.naverSocialLogin;
      default:
        // Social login 추가 시 여기에 Route 추가
        route = this.routes.naverSocialLogin;
    }

    const result = await this.request<any, SocialLoginResultType>({
      method: 'post',
      url: route,
      data: {access_token: accessToken},
    });

    // Stadusts token과 Navertoken
    const data = Object.assign(
      {
        social: {access_token: accessToken},
      },
      {
        villife: result.data,
      },
    );

    return {
      isSuccessful: result.isSuccessful,
      data: data,
    };
  }

  public async join(): Promise<any> {}

  public async registerFirebaseToken(
    accessToken: string,
    firebaseToken: string,
  ): Promise<Responsable<RegisterFirebaseTokenResult>> {
    const route = routes.registerFirebaseToken;

    return await this.request<any, RegisterFirebaseTokenResult>({
      url: route,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      params: {
        firebase_token: firebaseToken,
      },
    });
  }

  public async socialJoin(
    category: SocialLoginHostType,
    params: SocialJoinParamsType,
  ): Response<SocialJoinResultType> {
    let route: string;

    switch (category) {
      case 'naver':
        route = this.routes.naverSocialJoin;
      default:
        // Social login 추가 시 여기에 Route 추가
        route = this.routes.naverSocialJoin;
    }

    return await this.request<any, SocialJoinResultType>({
      method: 'post',
      url: route,
      data: params,
    });
  }
}

export default VillifeServer;
