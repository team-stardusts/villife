package com.stardusts.villife.pushnoti;

import android.util.Log;
import android.widget.Toast;

import com.google.firebase.messaging.RemoteMessage;
import com.stardusts.villife.VilllifeLog;

import java.util.Map;

public class MessageHandler {

    RemoteMessage message;
    public MessageHandler (RemoteMessage message) {
        this.message = message;
    }

    // handle message at here
    public void handleMessage() {
        Map<String, String> data = message.getData();
        if (message.getData().size() > 0) {
            Log.d(VilllifeLog.DEBUG_TAG, "Message data payload: " + message.getData());

        } else {
            Log.d(VilllifeLog.DEBUG_TAG, "Received empty message from "+message.getFrom());
        }

        // if message category : 0 , detail_type = 0 , do business logic
    }


}
