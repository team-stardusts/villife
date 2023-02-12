import {
    KakaoOAuthToken,
    KakaoProfile,
    getProfile,
    login as kakaoLogin,
    logout,
    unlink,
  } from '@react-native-seoul/kakao-login';
import { LoginDataType } from '../../../../internal/stardusts_storage/tables/types';
import ALoginManager from '../absc';
import { IKakaoLoginManager } from '../types';


class KakaoLoginManager extends ALoginManager implements IKakaoLoginManager{
    public async login(): Promise<LoginDataType | null> {
        try {
            const token: KakaoOAuthToken = await kakaoLogin();
            const {
                accessToken, 
                accessTokenExpiresAt, 
                refreshToken, 
                refreshTokenExpiresAt
                } = token;
            
            return {
                userId: "TEMP",
                accessToken,
                accessTokenExpiresAt,
                refreshToken,
                refreshTokenExpiresAt,
            }
        } 
        catch (e) {
            console.log(e);
            return null;
        }
    }
    public async logout(): Promise<any> {
        
    }
    public async refresh(): Promise<any> {
        
    }
    public async getKakaoProfile(): Promise<void> {
        const profile: KakaoProfile = await getProfile();
    
        console.log(JSON.stringify(profile));
      };
}


export default KakaoLoginManager;