import { useEffect, useRef, useState } from "react";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ComplaintDetailScreenProps from "./type";
import useComplaintDetailSecreenStyle from "./style";
import { ScrollView, Text, TextInput, View } from "react-native";
import React from "react";
import RemoteCSS from "../../../../../libs/themes/remote_css";
import AutoHeightWebView from "react-native-autoheight-webview";
import useUserInfoService from "../../../../common/hooks/service/user_info";
import ComplaintStatusLable from "../../blocks/status_lable";
import IconBuilding from "../../../../common/atoms/icon/building";
import { IconPerson } from "../../../../common/atoms/icon/human";
import ComplaintReplyItem from "../../blocks/reply_item";
import ReplyInputSection from "../../blocks/reply_input";
import useComplaintService from "../../services";
import { GetRepliesResult } from "../../../../../libs/rest_apis/villife/complaint/types";
import { ComplaintListUpatedEventListener } from "../../services/event";

export default function ComplaintDetailScreen({ navigation, route }: ComplaintDetailScreenProps) {
    const messages = useScreenMessage();
    const styles = useComplaintDetailSecreenStyle();
    const content = useRef(route.params.content);
    const title = useRef(route.params.title);
    const userInfo = useUserInfoService();
    const [replies, setReplies] = useState<GetRepliesResult>([]);
    const service = useComplaintService();

    useEffect(() => {
        service.GetReplies(route.params.id).then((r) => {
            const resData = r.data?.data as GetRepliesResult;
            if (resData == null || resData == undefined) return;
            setReplies([...resData]);
        });

        const listener = new ComplaintListUpatedEventListener();
        listener.subscribe(() => {
            console.log("이벤트 수신");
            service.GetReplies(route.params.id).then((r) => {
                const resData = r.data?.data as GetRepliesResult;
                console.log(resData);
                if (resData == null || resData == undefined) return;
                setReplies([...resData]);
            });
        });

        return () => {
            listener.unsubscribe();
        };
    }, []);

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.complaint.detail,
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}
            bottomNavOptions={{ shown: false }}>
            <ScrollView style={[styles.topLevelBox]} scrollEventThrottle={20}>
                <>
                    <TextInput
                        style={styles.title}
                        onChangeText={(text) => {
                            title.current = text;
                        }}
                        placeholder="제목을 입력하세요"
                        value={title.current}
                    />
                </>
                <View style={styles.statusBarSection}>
                    <ComplaintStatusLable status={route.params.status} />
                    <View style={styles.blockWithIcon}>
                        <IconBuilding size={styles.iconSize.width as number} />
                        <Text>{"건물이름"}</Text>
                    </View>
                    <View style={styles.blockWithIcon}>
                        <IconPerson color="black" size={(styles.iconSize.width as number) * 2} />
                        <Text>{"유저이름"}</Text>
                    </View>
                </View>
                <AutoHeightWebView
                    style={styles.webViewContainer}
                    customStyle={` ${RemoteCSS.getPretendardRegular()}
                    body {
                      font-size: 14px;
                      font-family:"Pretendard-Regular";
                    }
                    div {
                      color: #333;
                    }
                    img {
                        width: 500px;
                        height: 500px;
                        object-fit: cover;
                        display:block;
                        border-radius: 15px;
                      }`}
                    source={{ html: content.current }}
                    scalesPageToFit={false}
                    viewportContent={"width=device-width, user-scalable=no"}></AutoHeightWebView>
                <View>
                    <Text style={styles.replyTitle}>답글</Text>
                    <View style={styles.horizontalLine}></View>
                    {replies.map((reply, inedx) => {
                        return (
                            <View key={reply.id} style={styles.replyItem}>
                                <ComplaintReplyItem data={reply} />
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
            <ReplyInputSection complaintID={route.params.id} />
        </NavigationView>
    );
}
