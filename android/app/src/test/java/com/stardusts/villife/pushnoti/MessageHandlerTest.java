package com.stardusts.villife.pushnoti;

import com.stardusts.villife.pushnoti.msg.BasicMsg;
import static  com.google.common.truth.Truth.assertThat;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

public class MessageHandlerTest {

    @Test
    public void CreateBasicMsgTest () {
        MessageHandler handler = new MessageHandler(null,null);
        Map<String,String> data = new HashMap<String,String>();

        data.put("category","1");
        data.put("detail_type", "1");
        data.put("alias","test");

        BasicMsg msg = handler.createBasicMsg(data);
        assertThat(msg.getCategory()).isEqualTo(1);
        assertThat(msg.getDetail_type()).isEqualTo(1);
        assertThat(msg.getAlias()).isEqualTo("test");
    }

    @Test
    public void CreateBasicMsgTest_NoAlias () {
        MessageHandler handler = new MessageHandler(null,null);
        Map<String,String> data = new HashMap<String,String>();

        data.put("category","1");
        data.put("detail_type", "1");

        BasicMsg msg = handler.createBasicMsg(data);
        assertThat(msg.getCategory()).isEqualTo(1);
        assertThat(msg.getDetail_type()).isEqualTo(1);
        assertThat(msg.getAlias()).isEqualTo("");
    }

}
