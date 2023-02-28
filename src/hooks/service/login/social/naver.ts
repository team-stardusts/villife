import { NaverLogin } from '@react-native-seoul/naver-login';
import axios, {AxiosError} from 'axios';
//import NaverLogin, {
//    GetProfileResponse,
//} from '@react-native-seoul/naver-login';
import { LoginDataType } from '../../../internal/stardusts_storage/tables/types';
import SystemInfo from '../../../internal/systeminfo';
import useSystemInfo from '../../../internal/systeminfo/hooks';
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

            const data = {access_token: naverLoginResult.accessToken}
            console.log(data);

            //axios.get("http://192.168.0.36:8080/auth/test", {responseType: 'json'})
            //.then((res) => console.log(res))
            //.catch((err) => console.log(err))
            await axios.post(
                "http://192.168.0.36:8080/auth/social-login/naver", 
                data, 
                )
            .then((res) => console.log(res.data.access_token))
            .catch((err: any) => console.log(err.response?.data))
        } 
        catch (e) {
            return null;
        }
    }
    public async logout(): Promise<any> {
        console.log("logout")
        NaverLogin.logout();
        
    }
    public async refresh(): Promise<any> {
    }
}


export default NaverLoginManager;