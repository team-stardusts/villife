import Villife from "../../../villife-client/types";
import { TableUsable } from "../types";

export interface IUserTable extends TableUsable<UserTableKey, Villife.User.User> {}

export type UserTableKey = "user";
