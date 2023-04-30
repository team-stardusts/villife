import BuildingManager from "./building";
import LoginManagers from "./login";
import { UseBuildingManagerReturnType, UseLoginServiceReturnType } from "./types";

// [TO-DO]
// Service가 매서드의 집합(object)를 리턴 하도록 변경이 필요함.
// Service에서 전역 상태에 접근하거나, 스토리지에 접근해야 할 필요가 있기 때문.
export function useLoginService(): UseLoginServiceReturnType {
    return new LoginManagers();
}

export function useBuildingManager(): UseBuildingManagerReturnType {
    return new BuildingManager();
}
