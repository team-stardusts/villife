package com.stardusts.villife.pushnoti;

import com.google.firebase.messaging.RemoteMessage;

public class MessageHandler {

    RemoteMessage message;
    public MessageHandler (RemoteMessage message) {
        this.message = message;
    }

    // handle message at here
    public void handleMessage() {
        message.getData();
        // if message category : 0 , detail_type = 0 , do business logic
    }


}
