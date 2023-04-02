import React from 'react';
import {NativeModules, Button} from 'react-native';

export default class AndroidFirebaseModule {
  static readonly mNativeModule = NativeModules.FirebaseModule;

  static check() {
    console.log(this.mNativeModule);
  }
  static async getAccessToken() {
    return await this.mNativeModule.getAccessToken();
  }
}
