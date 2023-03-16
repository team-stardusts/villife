package com.stardusts.villife.pushnoti;


import static androidx.core.app.ActivityCompat.shouldShowRequestPermissionRationale;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;
import android.util.Log;
import android.widget.Toast;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.core.content.ContextCompat;

import com.facebook.react.ReactActivity;
import com.stardusts.villife.VilllifeLog;

public class PushPermissionRequester {

    private ReactActivity mMainActivity ;
    private final ActivityResultLauncher<String> requestPermissionLauncher;

    public PushPermissionRequester(ReactActivity activity) {
        this.mMainActivity = activity;
        this.requestPermissionLauncher =
                mMainActivity.registerForActivityResult(new ActivityResultContracts.RequestPermission(), isGranted -> {
                    if (isGranted) {
                        // FCM SDK (and your app) can post notifications.
                        Toast.makeText(mMainActivity,"푸시 알람을 허용하셨습니다.",Toast.LENGTH_SHORT).show();
                    } else {
                        Toast.makeText(mMainActivity,"푸시 알람을 허용하지 않으셨습니다.",Toast.LENGTH_SHORT).show();
                    }
                });
    }



    public void askNotificationPermission() {
        Log.d(VilllifeLog.DEBUG_TAG , "build version:"+Build.VERSION.SDK_INT);
        // This is only necessary for API level >= 33 (TIRAMISU)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(mMainActivity, Manifest.permission.POST_NOTIFICATIONS) ==
                    PackageManager.PERMISSION_GRANTED) {
                // FCM SDK (and your app) can post notifications.
            } else if (shouldShowRequestPermissionRationale(mMainActivity,Manifest.permission.POST_NOTIFICATIONS)) {
                // TODO: display an educational UI explaining to the user the features that will be enabled
                //       by them granting the POST_NOTIFICATION permission. This UI should provide the user
                //       "OK" and "No thanks" buttons. If the user selects "OK," directly request the permission.
                //       If the user selects "No thanks," allow the user to continue without notifications.

            } else {
                // Directly ask for the permission
                requestPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS);
            }
        }
    }

}
