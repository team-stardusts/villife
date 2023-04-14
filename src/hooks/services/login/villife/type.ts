import { LoginServiceParams, LoginServiceResult } from "../types";

export default interface IVillifeLoginManager {
    login(params: LoginServiceParams): Promise<LoginServiceResult>;
    logout(): Promise<boolean>;
    join(): Promise<any>;
}
