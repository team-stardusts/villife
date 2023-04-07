package com.stardusts.villife.pushnoti;

import android.content.Context;
import android.util.Log;
import androidx.annotation.NonNull;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.stardusts.villife.VilllifeLog;


public class CloudMessagingService extends FirebaseMessagingService {

    @Override
    public void onNewToken(@NonNull String token) {
        super.onNewToken(token);
        Log.d(VilllifeLog.DEBUG_TAG , "got new token :" + token);

    }

    @Override
    public void onMessageReceived(@NonNull RemoteMessage message) {

        Context context = getApplicationContext();
        super.onMessageReceived(message);
        MessageHandler handler = new MessageHandler(message,context);
        handler.handleMessage();

    }

    @Override
    public void onDeletedMessages() {
        super.onDeletedMessages();
        Log.d(VilllifeLog.DEBUG_TAG , "message deleted" );
    }


}