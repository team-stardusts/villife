import BuildingManager from "./building";
import type LoginManagers from "./login";

export type UseLoginServiceReturnType = LoginManagers;
export type UseBuildingManagerReturnType = BuildingManager;
export type LoginHosts = "villife" | "naver";