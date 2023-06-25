import { ReactNode } from "react";

export type BottomSlidableModalProps = {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    height?: number;
    children: ReactNode;
};
