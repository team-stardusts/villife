import { Authority } from "../../../rest_apis/villife/types";
import { ITableUsable } from "../types";

export interface IUserTable extends ITableUsable<UserTableKey, UserDataType> {}

export type UserTableKey = "user";

export type UserDataType = {
    name: string;
    authority: Authority[keyof Authority];
    room_id: number | undefined;
    building_id: number | undefined;
};
