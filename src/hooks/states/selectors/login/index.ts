import { selector } from "recoil";
import StardustsStorage from "../../../storage";
import { LoginDataType } from "../../../storage/tables/login/types";
import { loginDataState } from "../../atoms/login";
import { LoginDataStateType } from "../../atoms/login/types";

const storage = new StardustsStorage();

export const loginDataStateSelector = selector<LoginDataStateType>({
    key: "loginDataStateSelector",
    get: ({ get }): LoginDataStateType => get(loginDataState),
    set: ({ set }, loginData) => {
        const _loginData: any = loginData;
        storage.login.set(_loginData).then(() => set(loginDataState, loginData));
    },
});
