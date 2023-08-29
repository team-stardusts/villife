import type useRegisterBuildingScreenStyles from "../../styles";

export type RoomCountSetterProps = {
    styles: ReturnType<typeof useRegisterBuildingScreenStyles>["room"];
};

export type BuildingFloors = (number | null)[];

type FloorSetterDefaultProps = {
    styles: RoomCountSetterProps["styles"];
};

export type FloorSetterHeaderProps = FloorSetterDefaultProps & {
    onPress(hasUnderground: boolean): void;
};

export type FloorSetterRowProps = FloorSetterDefaultProps & {
    floor: number;
    rooms: number;
    onChangeRoomCount(rooms: number): void;
};

export type FloorAdditorProps = FloorSetterDefaultProps & {
    onPress(): void;
};

export type RoomsSettingModalProps = {
    initialRooms: number;
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onChangeRoomCount(rooms: number): void;
};
