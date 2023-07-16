import { SendParkPushNotiMessageType } from "../../../../../common/router/types";

export type BottomMessageSelectionModalProps = {
    vehicleID: number;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onMessageTypePress(messageType: SendParkPushNotiMessageType): void;
};

export type MessageTypeComponentProps = {
    vehicleID: number;
    messageType: SendParkPushNotiMessageType;
    onPress(): void;
};
