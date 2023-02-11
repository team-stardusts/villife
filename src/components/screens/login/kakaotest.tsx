import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';

export default function useKakaoLogin() {
  class KakaoLoginTemp {
    public async signInWithKakao(): Promise<void> {
      const token: KakaoOAuthToken = await login();
  
      console.log(JSON.stringify(token));
    };
  }

  const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();

    console.log(message);
  };

  const getKakaoProfile = async (): Promise<void> => {
    const profile: KakaoProfile = await getProfile();

    console.log(JSON.stringify(profile));
  };

  const unlinkKakao = async (): Promise<void> => {
    const message = await unlink();

    console.log(message);
  };

  return new KakaoLoginTemp();
}