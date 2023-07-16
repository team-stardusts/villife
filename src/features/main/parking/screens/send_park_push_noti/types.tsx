import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import MultilingualMessage from "../../../../common/hooks/multilingual";
import useSendParkPushNotiScreenStyles from "./styles";

type SendParkPushNotiScreenProps = NativeStackScreenProps<VillifeStackParamList, "send_park_push_noti">;

export type MessagesProps = {
    screenMessages: MultilingualMessage["messages"];
    styles: ReturnType<typeof useSendParkPushNotiScreenStyles>["message"];
    messageType: SendParkPushNotiScreenProps["route"]["params"]["messageType"];
    onMessageChange(message: string): void;
};

export default SendParkPushNotiScreenProps;
