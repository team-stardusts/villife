export type BottomMessageSelectionModalProps = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onMessageTypePress(messageType: MessageType): void;
};

export type MessageTypeComponentProps = {
    messageType: MessageType;
    onPress(): void;
};

export const MESSAGE_TYPE = {
    DOUBLE_PARKING: "double_parking",
    CHANGE_REQUEST: "change_request",
} as const;

export type MessageType = (typeof MESSAGE_TYPE)[keyof typeof MESSAGE_TYPE];
