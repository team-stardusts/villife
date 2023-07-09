import { SendParkPushNotiMessageType } from "../../../../../common/router/types";

export type BottomMessageSelectionModalProps = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onMessageTypePress(messageType: SendParkPushNotiMessageType): void;
};

export type MessageTypeComponentProps = {
    messageType: SendParkPushNotiMessageType;
    onPress(): void;
};
