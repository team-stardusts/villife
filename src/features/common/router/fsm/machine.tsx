import { useNavigation } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";
import { VillifeNavigation, VillifeRouterParams, VillifeStackParamList } from "../types";
import { VillifeAppState, RouteFiniteStateMachine, VillifeLoginState } from "./types";
import VillifeStorage from "../../../../libs/storage";
import { useRecoilState, useSetRecoilState } from "recoil";
import { LoginDataType } from "../../../../libs/storage/tables/login/types";
import { loginDataState } from "../../hooks/states/atoms/login";
import useAdminInfoService from "../../hooks/service/user_info/service";
import { UserInfo } from "../../hooks/service/user_info/types";
import { objectToCamel } from "ts-case-convert";
import { villifeAppState, villifeLoginState } from "./state";

export default function useRouteFSM() {
    const setLoginData = useSetRecoilState<LoginDataType | null>(loginDataState);
    const [appState, setAppState] = useRecoilState<VillifeAppState>(villifeAppState);
    const [loginState, setLoginState] = useRecoilState<VillifeLoginState>(villifeLoginState);
    //const [linking, setLinking] = useState<string | null>(null);

    const navigation = useNavigation<VillifeNavigation>();
    const storage = VillifeStorage.getInstance();
    const adminService = useAdminInfoService();

    class RouteFSM implements RouteFiniteStateMachine {
        private _appState: VillifeAppState = appState;
        private _loginState: VillifeLoginState = loginState;
        //private _linking: string | null = linking;

        public get appState(): VillifeAppState {
            return this._appState;
        }

        public set appState(newAppState: VillifeAppState) {
            setAppState(newAppState);
        }

        /* public get linkingUrl(): string | null {
            return this._linking;
        }

        public set linkingUrl(newAppState: string | null) {
            setLinking(newAppState);
        } */

        public get loginState(): VillifeLoginState {
            return this._loginState;
        }

        public set loginState(newSituation: VillifeLoginState) {
            setLoginState(newSituation);
        }

        public onAccessIntoApp(): void {
            /* 
            state가 없는 상태에서 onChangeUserState 호출 시 에러가 발생함.
            따라서, state가 undefined일 때 default screen인 splash를 삽입함.
            Deeplinking과 같은 방법으로 App을 시작할 경우 해당사항 없음.
            */
            if (!navigation.getState()) {
                navigation.navigate("splash", {});
            }

            setTimeout(async () => {
                await storage.login.get().then((data) => {
                    // Naming convention이 CamelCase로 변경됨에 따라
                    // 기존 스토리지에 저장된 login data와의 호환성을 위해
                    // Snake to camel 변환을 해줌
                    setLoginData(data === null ? data : objectToCamel(data));
                    setAppState(VillifeAppState.BUSY);
                });
            }, 500);
        }

        public onSignIn(userinfo: UserInfo | null): this {
            if (userinfo === null) {
                this.loginState = VillifeLoginState.FAILED_TO_SIGN_IN;
                return this;
            }

            if (userinfo.isAdmin) {
                adminService.initializeAdminInformation();

                this.loginState = VillifeLoginState.NORMAL;
            } else if (userinfo.isRenter) {
                if (userinfo.roomID === 0) {
                    this.loginState = VillifeLoginState.NO_ROOM;
                } else if (userinfo.buildingID === 0) {
                    this.loginState = VillifeLoginState.NO_BUILDING;
                } else {
                    this.loginState = VillifeLoginState.NORMAL;
                }
            } else {
                this.loginState = VillifeLoginState.EXCEPTION;
            }

            /* if (this.situation === Situation.NORMAL && this._previousSituation === Situation.NORMAL) {
                this.situation = Situation.REFRESHED;
            } */

            return this;
        }

        public onChangeUserState(): void {
            switch (this.loginState) {
                case VillifeLoginState.NORMAL:
                    this.onChangeLoginStateToNormal();
                    break;

                case VillifeLoginState.NO_BUILDING:
                    console.log("[ONLOGIN] User has no room, navigate to Set Building Page");

                    navigation.reset({
                        index: 0,
                        routes: [{ name: "set_building" }],
                    });
                    break;

                case VillifeLoginState.NO_ROOM:
                    console.log("[ONLOGIN] User has no room, navigate to Set Building Page");

                    navigation.reset({
                        index: 0,
                        routes: [{ name: "set_building" }],
                        //routes: [{ name: "welcome", params: { authority: 1 } }],
                    });
                    break;

                case VillifeLoginState.FAILED_TO_SIGN_IN:
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "login" }],
                    });
                    break;

                case VillifeLoginState.SIGN_OUT:
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "login" }],
                    });

                    break;

                case VillifeLoginState.EXCEPTION:
                    // [TO-DO] 예외 상황 처리용 스크린이 필요함
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "login" }, { name: "test" }],
                    });

                    break;
            }
        }

        private onChangeLoginStateToNormal() {
            console.log("[ONLOGIN]", "Refresh the access token.");

            const routes = navigation.getState().routes;

            // Default screen이 splash이므로, 리프레쉬를 하더라도 0번 스택에 splash가 쌓임
            // Login을 못했거나, 로그인에 실패한 경우에는 이 분기에 도달하지 않음
            if (routes.length > 0) {
                if (routes[0].name === "splash" || routes[0].name === "login") {
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
        }
    }

    return new RouteFSM();
}
