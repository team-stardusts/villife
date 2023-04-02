package com.stardusts.villife.pushnoti;

import android.util.Log;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.firebase.messaging.FirebaseMessaging;
import com.stardusts.villife.VilllifeLog;

import java.util.Map;
import java.util.HashMap;


public class FirebaseModule extends ReactContextBaseJavaModule {

    public FirebaseModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "FirebaseModule";
    }

    //@describe get Fire base token
    @ReactMethod
    public void getAccessToken(Promise promise) {

        Log.d(VilllifeLog.DEBUG_TAG, "Android Native Module Class : FirebaseModule method : getAccessToken()");

        FirebaseMessaging.getInstance().getToken()
                .addOnCompleteListener(task -> {
                    if (!task.isSuccessful()) {
                        promise.reject(VilllifeLog.DEBUG_TAG,"Fetching FCM registration token failed");
                        return;
                    }
                    Log.d(VilllifeLog.DEBUG_TAG, "have gotten firebase token successfully");
                    String token = task.getResult();
                    promise.resolve(token);
                });
    }




}
