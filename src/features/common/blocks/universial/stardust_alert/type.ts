export type StardustAlertProps = {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    mainText: string;
    leftButtonText: string;
    rightButtonText: string;
    leftOnPress: () => void;
    rightOnPress: () => void;
    image?: any; //must use require()
};
