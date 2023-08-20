import React from "react";
import { ColorValue } from "react-native";
import { IconSeries } from "../../../atoms/icon/types";

export type StardustModalProps = {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    subtitle?: string;
    upperRightFunc?: {
        icon: IconSeries;
        color?: ColorValue;
        onPress?(): void;
    };
    buttons: StardustModalButton[];
    onPressVoidSpace?: () => void;
    image?: any; //must use require()
    children?: React.ReactNode;
};

export type StardustModalButton = {
    text: string;
    textColor?: ColorValue;
    color?: ColorValue;
    disabled?: boolean;
    onPress?(): void;
};

/* export type StardustModalProps = {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    subtitle?: string;
    leftButtonText: string;
    rightButtonText: string;
    rightBtnDisabled?: boolean;
    leftButtonColor?: ColorValue;
    rightButtonColor?: ColorValue;
    buttons: StardustModalButton[];
    onPressLeftBtn: () => void;
    onPressRightBtn: () => void;
    onPressVoidSpace?: () => void;
    image?: any; //must use require()
    children?: React.ReactNode;
}; */
