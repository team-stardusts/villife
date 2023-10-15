import { IconSeries } from "../../../atoms/icon/types";

export type ListBottomSlidableModalProps = {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    features: ModalFeature[];
};

export type ModalFeature = {
    icon: IconSeries;
    text: string;
    onPress(): void;
};
