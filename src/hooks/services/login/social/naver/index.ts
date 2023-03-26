import { NaverLogin } from '@react-native-seoul/naver-login';
import { CustomSocialLoginResultType, SocialJoinResultType } from '../../../../../libs/rest_apis/villife/types';
import { Response } from '../../../../../libs/rest_apis/types';
//import NaverLogin, {
//    GetProfileResponse,
//} from '@react-native-seoul/naver-login';

import ISystemInfo from '../../../../systeminfo';
import useSystemInfo from '../../../../systeminfo/hooks';
import ALoginManager from '../../absc';
import INaverLoginManager from './types';
import DotEnv from '../../../../../libs/dotenv';
//import { INaverLoginManager } from '../types';


const APP_NAME = "villife";
const CONSUMER_KEY = "h9g_ACLEIul7f_iFXNx1";
const CONSUMER_SECRET = "7L_rwsIBsk";
const SERVISE_URL_SHEME = "com.stardusts.villife";

class NaverLoginManager extends ALoginManager implements INaverLoginManager{
    systemInfo: ISystemInfo = useSystemInfo();
    private env: DotEnv = new DotEnv();

    public async login(): Response<CustomSocialLoginResultType> {
        const params = {
            kServiceAppName: this.env.app.NAME ?? "",
            kConsumerKey: this.env.api.naver.API_CONSUMER_KEY ?? "",
            kConsumerSecret: this.env.api.naver.API_CONSUMER_SECRET ?? "",
        }

        if (this.systemInfo.platform.OS === "ios") {
            Object.assign(params, {kServiceAppUrlScheme: this.env.api.naver.API_SERVISE_URL_SHEME ?? ""})
        }

        const naverLoginResult: any = await new Promise((resolve, reject) => {
            NaverLogin.login(params, (err, token) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(token);
                return; 
            })
        })

        // NaverLogin 실패 상황 예외 처리 필요
        return await this.villife.socialLogin("naver", naverLoginResult.accessToken);
    }

    public async logout(): Promise<any> {
        console.log("logout");
        NaverLogin.logout();
        
    }
    public async refresh(): Promise<any> {
    }

    public async join(id: string, password: string, accessToken: string): Response<SocialJoinResultType> {
        return await this.villife.socialJoin("naver", {
            id,
            password,
            access_token: accessToken,
        });
        
    }
}


export default NaverLoginManager;