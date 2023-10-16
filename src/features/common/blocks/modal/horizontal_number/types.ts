export type HorizontalNumberPickingModalProps = {
    initialIndex?: number;
    numbersRange: number[];
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onChangeNumber(rooms: number): void;
};
