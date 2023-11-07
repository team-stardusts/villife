import { StyleSheet } from "react-native";
import { ConvertedApprovalData } from "../outlined_box/converter_approval";

export default interface ApprovalRequiredModalProps {
    convertedApprovalRequest: ConvertedApprovalData;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export type UseApprovalRequiredModalStylesType = ReturnType<typeof StyleSheet.create>;

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
