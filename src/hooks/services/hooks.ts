import BuildingManager from "./building";
import LoginManagers from "./login";
import { UseBuildingManagerReturnType, UseLoginServiceReturnType } from "./types";


export function useLoginService(): UseLoginServiceReturnType {
    return new LoginManagers();
}


export function useBuildingManager(): UseBuildingManagerReturnType {
    return new BuildingManager();
}