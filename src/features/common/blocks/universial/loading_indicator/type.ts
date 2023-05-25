import React from "react";

export type LoadingIndicatorProps = {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    subtitle?: string;
};
