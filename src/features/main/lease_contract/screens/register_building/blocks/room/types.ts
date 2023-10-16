import type useRegisterBuildingScreenStyles from "../../styles";

export type RoomCountSetterProps = {
    styles: ReturnType<typeof useRegisterBuildingScreenStyles>["room"];
    onChangeRoomCount(floors: BuildingFloors): void;
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
