package com.stardusts.villife.pushnoti;

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
        super.onMessageReceived(message);
        MessageHandler handler = new MessageHandler(message);
        handler.handleMessage();
        Log.d(VilllifeLog.DEBUG_TAG , "message arrived" + message.getData());
    }

    @Override
    public void onDeletedMessages() {
        super.onDeletedMessages();
        Log.d(VilllifeLog.DEBUG_TAG , "message deleted" );
    }


}