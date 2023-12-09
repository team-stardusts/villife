import { useNavigation } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";
import { VillifeRouterParams } from "../../types";
import { LoadingState, RouteFSMBase, Situation } from "./types";
import VillifeStorage from "../../../../../libs/storage";
import { useSetRecoilState } from "recoil";
import { LoginDataType } from "../../../../../libs/storage/tables/login/types";
import { loginDataState } from "../../../hooks/states/atoms/login";
import { useState } from "react";
import useAdminInfoService from "../../../hooks/service/user_info/service";
import { UserInfo } from "../../../hooks/service/user_info/types";

export default function useRouteFSM() {
    const setLoginData = useSetRecoilState<LoginDataType | null>(loginDataState);
    const [isLoading, setIsLoading] = useState<LoadingState>(LoadingState.BUSY);
    const navigation = useNavigation<VillifeRouterParams["navigation"]>();
    const storage = VillifeStorage.getInstance();
    const adminService = useAdminInfoService();

    class RouteFSM implements RouteFSMBase {
        public loading: LoadingState = isLoading;

        private _situation: Situation = Situation.NORMAL;

        public get situation(): Situation {
            return this._situation;
        }

        public set situation(newSituation: Situation) {
            this._situation = newSituation;
        }

        onAccessIntoApp(): void {
            navigation.navigate("splash", {});

            setTimeout(async () => {
                await storage.login.get().then((data) => {
                    setLoginData(data);
                    setIsLoading(LoadingState.IDLE);
                });
            }, 500);
        }

        onLogin(userinfo: UserInfo | null): this {
            if (userinfo === null) {
                this.situation = Situation.LOGGIN_FAILED;
                return this;
            }

            if (userinfo.isAdmin) {
                adminService.initializeAdminInformation();

                this.situation = Situation.NORMAL;
            } else if (userinfo.isRenter) {
                if (userinfo.roomID === 0) {
                    this.situation = Situation.NO_ROOM;
                } else if (userinfo.buildingID === 0) {
                    this.situation = Situation.NO_BUILDING;
                } else {
                    this.situation = Situation.NORMAL;
                }
            } else {
                this.situation = Situation.EXCEPTION;
            }

            /* if (this.situation === Situation.NORMAL && this._previousSituation === Situation.NORMAL) {
                this.situation = Situation.REFRESHED;
            } */

            return this;
        }

        onChangeSituation(situation?: Situation): void {
            if (situation !== undefined) {
                this.situation = situation;
            }

            switch (this.situation) {
                case Situation.NORMAL:
                    console.log("[ONLOGIN]", "Refresh the access token.");
                    const routes = navigation.getState().routes;

                    // Default screen이 login이므로, 리프레쉬를 하더라도 0번 스택에 login이 쌓임
                    // Login을 못했거나, 로그인에 실패한 경우에는 이 분기에 도달하지 않음
                    if (routes.length > 0) {
                        if (routes[0].name === "login") {
                            // 정상 로그인
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "home" }],
                                //routes: [{ name: "home" }, { name: "contract_memo_edit" }],
                                //routes: [{ name: "parking" }],
                                //routes: [{ name: "set_building" }],
                                //routes: [{ name: "welcome", params: { authority: 1 } }],
                                //routes: [{ name: "test" }],
                                //routes: [{ name: "verify_personal_info", params: { authority: 1 } }],
                                //routes: [{ name: "verify_auth_code", params: { authority: 1 } }],
                                //routes: [{ name: "lease_contract" }],
                                //routes: [{ name: "management_fee" }],
                                //routes: [{ name: "home" }, { name: "building_management" }],
                                //routes: [{ name: "home" }, { name: "register_building" }],
                                //routes: [{ name: "building_management" }],
                            });
                        } else if (routes[0].name === "welcome") {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "home" }],
                            });
                        } else if (routes[0].name === "set_building") {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "home" }],
                            });
                        }
                    }

                    // 이 곳에 다른 스크린으로 라우팅 하는 코드를 삽입할 경우
                    // 일정 시간이 지나 Access token이 초기화 될 시
                    // 유저가 보고 있던 스크린을 잃음
                    break;

                case Situation.NO_BUILDING:
                    console.log("[ONLOGIN] User has no room, navigate to Set Building Page");

                    navigation.reset({
                        index: 0,
                        routes: [{ name: "set_building" }],
                    });
                    break;

                case Situation.NO_ROOM:
                    console.log("[ONLOGIN] User has no room, navigate to Set Building Page");

                    navigation.reset({
                        index: 0,
                        routes: [{ name: "set_building" }],
                        //routes: [{ name: "welcome", params: { authority: 1 } }],
                    });
                    break;

                case Situation.LOGGIN_FAILED:
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "login" }],
                    });
                    break;

                case Situation.LOGGED_OUT:
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "login" }],
                    });

                    break;

                case Situation.EXCEPTION:
                    // [TO-DO] 예외 상황 처리용 스크린이 필요함
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "login" }, { name: "test" }],
                    });

                    break;
            }
        }
    }

    return new RouteFSM();
}
