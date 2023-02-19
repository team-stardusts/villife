import LoginManager from "./login";
import { UseLoginServiceReturnType } from "./types";

export default function useLoginService(): UseLoginServiceReturnType {
    return new LoginManager();
}