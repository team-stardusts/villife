import {
    KakaoOAuthToken,
    KakaoProfile,
    getProfile,
    login as kakaoLogin,
    logout,
    unlink,
  } from '@react-native-seoul/kakao-login';
import { NaverLogin } from '@react-native-seoul/naver-login';
//import NaverLogin, {
//    GetProfileResponse,
//} from '@react-native-seoul/naver-login';
import { LoginDataType } from '../../../../internal/stardusts_storage/tables/types';
import SystemInfo from '../../../../internal/systeminfo';
import useSystemInfo from '../../../../internal/systeminfo/hooks';
import ALoginManager from '../absc';
import { INaverLoginManager } from '../types';


const APP_NAME = "villife";
const CONSUMER_KEY = "h9g_ACLEIul7f_iFXNx1";
const CONSUMER_SECRET = "7L_rwsIBsk";
const SERVISE_URL_SHEME = "com.stardusts.villife";

class NaverLoginManager extends ALoginManager implements INaverLoginManager{
    systemInfo: SystemInfo = useSystemInfo();

    public async login(): Promise<any> {
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

        try {
            
            const params = this.systemInfo.platform.OS === "ios" ? iosParams : androidParams;
            
            NaverLogin.login(params, (err, token) => console.log(err, token))
            //console.log("success: ", successResponse);
            //console.log("failure: ", failureResponse);
        } 
        catch (e) {
            console.log(e);
            return null;
        }
    }
    public async logout(): Promise<any> {
        console.log("logout")
        NaverLogin.logout();
        
    }
    public async refresh(): Promise<any> {
        
    }
    public async getKakaoProfile(): Promise<void> {
        const profile: KakaoProfile = await getProfile();
    
        console.log(JSON.stringify(profile));
      };
}


export default NaverLoginManager;