import { Authority } from "../../../rest_apis/villife/types";
import { TableUsable } from "../types";

export interface IUserTable extends TableUsable<UserTableKey, UserDataType> {}

export type UserTableKey = "user";

export type UserDataType = {
    authority: Authority[keyof Authority];
    building_id: number | undefined;
    building_road_addr: string;
    name: string;
    room_id: number;
    room_number: number;
};
