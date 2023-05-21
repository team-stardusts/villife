import React from "react";

export type StardustAlertProps = {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    subtitle?: string;
    leftButtonText: string;
    rightButtonText: string;
    leftOnPress: () => void;
    rightOnPress: () => void;
    image?: any; //must use require()
    children?: React.ReactNode;
};
