import type useRegisterBuildingScreenStyles from "../../styles";

export type RoomCountSetterProps = {
    styles: ReturnType<typeof useRegisterBuildingScreenStyles>["room"];
};

export type BuildingFloors = {
    [key: number]: number;
};

type FloorSetterDefaultProps = {
    styles: RoomCountSetterProps["styles"];
};

export type FloorSetterHeaderProps = FloorSetterDefaultProps & {
    onPress(hasUnderground: boolean): void;
};

export type FloorSetterRowProps = FloorSetterDefaultProps & {
    floor: number;
    onChangeRooms(rooms: number): void;
};

export type FloorAdditorProps = FloorSetterDefaultProps & {
    onPress(): void;
};
