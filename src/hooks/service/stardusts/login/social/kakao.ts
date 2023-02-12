import {
    KakaoOAuthToken,
    KakaoProfile,
    getProfile,
    login as kakaoLogin,
    logout,
    unlink,
  } from '@react-native-seoul/kakao-login';
import ALoginManager from '../absc';
import { IKakaoLoginManager } from '../types';


class KakaoLoginManager extends ALoginManager implements IKakaoLoginManager{
    public async login(): Promise<any> {
        try {
            const token: KakaoOAuthToken = await kakaoLogin();
            console.log(token)
        } 
        catch (e) {
            console.log(e);
        }
    }
    public async logout(): Promise<any> {
        
    }
    public async refresh(): Promise<any> {
        
    }
}


export default KakaoLoginManager;