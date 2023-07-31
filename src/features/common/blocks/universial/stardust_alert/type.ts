import React from "react";
import { ColorValue } from "react-native";

export type StardustAlertProps = {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    subtitle?: string;
    leftButtonText: string;
    rightButtonText: string;
    leftButtonColor?: ColorValue;
    rightButtonColor?: ColorValue;
    onPressLeftBtn: () => void;
    onPressRightBtn: () => void;
    onPressVoidSpace?: () => void;
    image?: any; //must use require()
    children?: React.ReactNode;
};
