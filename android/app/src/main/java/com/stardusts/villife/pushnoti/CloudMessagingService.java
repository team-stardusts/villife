package com.stardusts.villife.pushnoti;

import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.stardusts.villife.MainActivity;
import com.stardusts.villife.VilllifeLog;


public class CloudMessagingService extends FirebaseMessagingService {

    @Override
    public void onCreate() {
        super.onCreate();

        Log.d(VilllifeLog.DEBUG_TAG , "CloudMessagingService Created");
    }

    @Override
    public void onNewToken(@NonNull String token) {
        super.onNewToken(token);

        Log.d(VilllifeLog.DEBUG_TAG , "got new token :" + token);

    }

    @Override
    public void onMessageReceived(@NonNull RemoteMessage message) {
        super.onMessageReceived(message);
        Log.d(VilllifeLog.DEBUG_TAG , "message arrived" + message.getData());
    }

    @Override
    public void onDeletedMessages() {
        super.onDeletedMessages();
        Log.d(VilllifeLog.DEBUG_TAG , "message deleted" );
    }

    public void getPresentToken() {

        FirebaseMessaging.getInstance().getToken()
                .addOnCompleteListener(task -> {
                    if (!task.isSuccessful()) {
                        Log.d(VilllifeLog.DEBUG_TAG, "Fetching FCM registration token failed", task.getException());
                        return;
                    }

                    String token = task.getResult();
                    Log.d(VilllifeLog.DEBUG_TAG, token);

                });

        FirebaseMessaging.getInstance().subscribeToTopic("weather")
                .addOnCompleteListener(task -> {
                    String msg = "Subscribed";
                    if (!task.isSuccessful()) {
                        msg = "Subscribe failed";
                    }
                    Log.d(VilllifeLog.DEBUG_TAG, msg);

                });
    }
}