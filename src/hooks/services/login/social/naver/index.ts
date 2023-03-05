import { NaverLogin } from '@react-native-seoul/naver-login';
import axios, {AxiosError} from 'axios';
import { CustomSocialLoginResultType, StardustsResultType } from '../../../../../libs/rest_apis/stardusts/types';
//import NaverLogin, {
//    GetProfileResponse,
//} from '@react-native-seoul/naver-login';
import { LoginDataType } from '../../../../storage/tables/types';
import SystemInfo from '../../../../systeminfo';
import useSystemInfo from '../../../../systeminfo/hooks';
import ALoginManager from '../../absc';
//import { INaverLoginManager } from '../types';


const APP_NAME = "villife";
const CONSUMER_KEY = "h9g_ACLEIul7f_iFXNx1";
const CONSUMER_SECRET = "7L_rwsIBsk";
const SERVISE_URL_SHEME = "com.stardusts.villife";

class NaverLoginManager extends ALoginManager {
    systemInfo: SystemInfo = useSystemInfo();

    public async login(): Promise<StardustsResultType<CustomSocialLoginResultType>> {
        const iosParams = {
            kServiceAppName: APP_NAME,
            kConsumerKey: CONSUMER_KEY,
            kConsumerSecret: CONSUMER_SECRET,
            kServiceAppUrlScheme: SERVISE_URL_SHEME
        }
        const androidParams = {
            kServiceAppName: APP_NAME,
            kConsumerKey: CONSUMER_KEY,
            kConsumerSecret: CONSUMER_SECRET,
        }

        const params = this.systemInfo.platform.OS === "ios" ? iosParams : androidParams;

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
        return await this.server.socialLogin("naver", naverLoginResult.accessToken);
    }

    public async logout(): Promise<any> {
        console.log("logout");
        NaverLogin.logout();
        
    }
    public async refresh(): Promise<any> {
    }
}


export default NaverLoginManager;