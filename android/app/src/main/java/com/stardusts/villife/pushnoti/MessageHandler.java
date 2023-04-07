package com.stardusts.villife.pushnoti;

import android.content.Context;
import android.util.Log;
import com.google.firebase.messaging.RemoteMessage;
import com.google.gson.Gson;
import com.stardusts.villife.VilllifeLog;
import com.stardusts.villife.pushnoti.msg.BasicMsg;
import java.util.Map;

public class MessageHandler {

    RemoteMessage message;
    private Gson mGson;
    private  Context mContext;
    public MessageHandler (RemoteMessage message , Context context) {
        this.message = message;
        this.mGson = new Gson();
        this.mContext = context;

    }

    // handle message at here
    public void handleMessage() {
        Map<String, String> data = message.getData();
        BasicMsg msg = createBasicMsg(data);
        Log.d(VilllifeLog.DEBUG_TAG, "Received data "+message.getData());
        RemoteMessage.Notification  notification = message.getNotification();
        Log.d(VilllifeLog.DEBUG_TAG, "Received noti : "+notification.getBody());


        if (message.getData().size() > 0) {
            //Parse message category and detail type
            // switch selector : category*1000 + detail_type
            int selector = msg.getCategory()*1000 +  msg.getDetail_type();
            // logic distribution
            switch (selector) {
                // in logic , parse json payload to make it payload object
                // how to write annotation on case : [receiver type] title
                case 0 : // [admin] user residence validation



                    break;
                case 1 : // [site-admin] admin validation
                    break;
                case 1001 :
                    break;

            }



        } else {
            Log.d(VilllifeLog.DEBUG_TAG, "Received empty message from "+message.getFrom());
        }

        // if message category : 0 , detail_type = 0 , do business logic
    }
    public BasicMsg createBasicMsg (Map<String,String> data ) {
        BasicMsg msg = new BasicMsg();
        String sCategory = data.get("category");
        String sDetailType = data.get("detail_type");
        String alias = data.get("alias");
        if (sCategory==null || sDetailType ==null) return null;
        int category = Integer.parseInt(sCategory);
        int detailType = Integer.parseInt(sDetailType);
        msg.setCategory(category);
        msg.setDetail_type(detailType);
        msg.setAlias("");
        if (alias != null) {
            msg.setAlias(alias);
        }
        return  msg;
    }

}
