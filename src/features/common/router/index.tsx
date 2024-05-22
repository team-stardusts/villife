import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "./types";
import { useAutoRegisterFirebaseToken } from "../hooks/firebase/token";
import ApprovalHomeScreen from "../../main/approval/screens/home";
import LeaseContractHomeScreen from "../../main/lease_contract/screens/home";
import BuildingSendMessageScreen from "../../main/lease_contract/screens/send_message";
import CommonComplaintHomeScreen from "../../main/common_complaint/screens/home";
import CommonComplaintModifyScreen from "../../main/common_complaint/screens/modify";
import CommonComplaintRegisterScreen from "../../main/common_complaint/screens/register";
import ComplaintHomeScreen from "../../main/complaint/screens/home";
import ComplaintRegisterScreen from "../../main/complaint/screens/register";
import ComplaintDetailScreen from "../../main/complaint/screens/detail";
import ComplaintModifyScreen from "../../main/complaint/screens/modify";
import SetAuthorityScreen from "../../auth/screens/set_authority";
import HomeScreen from "../../main/home/screens/home";
import ImageDetailView from "../screens/image_detail_view";
import LoginScreen from "../../auth/screens/login";
import MyPageScreen from "../../main/mypage/screens/mypage";
import MyPageHomeScreen from "../../main/mypage/screens/home";
import NoticeRegisterScreen from "../../main/noti/screens/register";
import NoticeHomeScreen from "../../main/noti/screens/home";
import NoticeModifyScreen from "../../main/noti/screens/modify";
import ParkingScreen from "../../main/parking/screens/home";
import ManagementFeeHomeScreen from "../../expense/management_fee/screens/home";
import PermissionRequestScreen from "../../auth/screens/permission_request";
import RegisterVehicleScreen from "../../main/parking/screens/register_vehicle";
import RegisterGuestVehicleScreen from "../../main/parking/screens/register_guest_vehicle";
import BuildingSettingScreen from "../../main/lease_contract/screens/building_setting";
import SendParkPushNotiScreen from "../../main/parking/screens/send_park_push_noti";
import SplashScreen from "../../splash/screens";
import SetBuildingScreen from "../../auth/screens/set_building";
import SearchAddressScreen from "../screens/search_address";
import TermsOfServiceScreen from "../../auth/screens/terms_of_service/index.";
import TestScreen from "../../test";
import useRouteFSMEngine from "./fsm";
import WelcomeScreen from "../../auth/screens/welcome";
import TenantDetailScreen from "../../main/lease_contract/screens/tenant_detail";
import TenantSettingScreen from "../../main/lease_contract/screens/tenant_setting";
import ComposeMessageScreen from "../../main/lease_contract/screens/compose_message";
import CommonPaymentWindowScreen from "../../expense/payment/screens/payment_window_common";
import ConfirmPaymentCostScreen from "../../expense/payment/screens/confirm_payment_cost";
import ManagementFeeDetailScreen from "../../expense/management_fee/screens/detail";
import { Alert, AppState, Linking, Platform } from "react-native";
import useFirebaseMessagingEmitter from "../hooks/firebase/messaging/emission";
import CompanyIntroductionScreen from "../../main/mypage/screens/company_introduction";
import ExpenseApprovalScreen from "../../expense/management_fee/screens/approval/screens/home";
import BuildingMFHistoryScreen from "../../expense/management_fee/screens/building";
import WireAmountManually from "../../expense/management_fee/screens/wire_amount_manually";
import RequestPaymentConfirmationScreen from "../../expense/management_fee/screens/request_payment_confirmation";
import MFSelectToDoSomethingScreen from "../../expense/management_fee/screens/select_to_do_something";
import RefundPolicyScreen from "../../expense/payment/screens/refund_policy";
import VerifyPersonalInfoScreen from "../../auth/screens/verify_personal_info";
import VerifyAuthCodeScreen from "../../auth/screens/verify_auth_code";
import SetAccountScreen from "../../auth/screens/set_account";
import ManagementFeeCurrentMonthDetailScreen from "../../expense/management_fee/screens/current_month_detail";
import BuildingInfoScreen from "../screens/building_info";
import ExpenseComposeMessageScreen from "../../expense/management_fee/screens/compose_message";
import TenantContractInfoScreen from "../../main/lease_contract/screens/contract_information";
import BuildingAdditionGuideScreen from "../../main/home/screens/building-addition-guide";
import ContractMemoEditScreen from "../../main/lease_contract/screens/memo";
import { NotificationBoxScreen } from "../../main/home/screens/notification-box";
import WithdrawalScreen from "../../main/mypage/screens/withdrawal";
import MyPageWebViewScreen from "../screens/webview";
import { useRecoilState } from "recoil";
import { isConnetedToNetworkState } from "../hooks/states/atoms/network";
import { useEffect } from "react";
import { IEventListenable } from "../global_interface";
import { NetInfoEvents } from "../../../libs/netinfo/types";
import { NetInfoState } from "@react-native-community/netinfo";
import NetInfoEventHandler from "../../../libs/netinfo";
import useFirebaseMessagingListener from "../hooks/firebase/messaging/listening";
import villifeVersion from "../../../libs/villife-version";

enableScreens(true);

const Stack = createNativeStackNavigator<VillifeStackParamList>();

export default function ScreenRouter() {
    const netinfo: IEventListenable<NetInfoEvents, NetInfoState> = new NetInfoEventHandler();
    const [_, setIsConnectedToNetwork] = useRecoilState<boolean>(isConnetedToNetworkState);

    useFirebaseMessagingEmitter();
    useFirebaseMessagingListener();
    useRouteFSMEngine();
    useAutoRegisterFirebaseToken();

    useEffect(() => {
        // 앱 시작 시 네트워크 스테이트 설정
        // Network가 연결되지 않은 경우 예외 처리를 위함
        netinfo.listen("changed", (_, state) => {
            setIsConnectedToNetwork(state.isConnected === null ? false : state.isConnected);
        });

        checkVersionIsLatest();

        const appStateListener = AppState.addEventListener("change", (state) => {
            if (state === "active") {
                checkVersionIsLatest();
            }
        });

        return () => {
            netinfo.removeAllListeners();
            appStateListener.remove();
        };
    }, []);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: Platform.select({
                    ios: "fade",
                    android: "fade",
                }),
            }}
            initialRouteName={"splash"}>
            <Stack.Group>
                <Stack.Screen name={"permission_request"} component={PermissionRequestScreen} />
                <Stack.Screen name={"login"} component={LoginScreen} />
                <Stack.Screen name={"terms_of_service"} component={TermsOfServiceScreen} />
                <Stack.Screen name={"create_account"} component={SetAuthorityScreen} />
                <Stack.Screen name={"welcome"} component={WelcomeScreen} />
                <Stack.Screen name={"set_building"} component={SetBuildingScreen} />
                <Stack.Screen name={"verify_personal_info"} component={VerifyPersonalInfoScreen} />
                <Stack.Screen name={"verify_auth_code"} component={VerifyAuthCodeScreen} />
                <Stack.Screen name={"set_account"} component={SetAccountScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"home"} component={HomeScreen} />
                <Stack.Screen name={"building_addition_guide"} component={BuildingAdditionGuideScreen} />
                <Stack.Screen name={"notification_box"} component={NotificationBoxScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"lease_contract"} component={LeaseContractHomeScreen} />
                <Stack.Screen name={"building_setting"} component={BuildingSettingScreen} />
                <Stack.Screen name={"tenant_detail"} component={TenantDetailScreen} />
                <Stack.Screen name={"tenant_setting"} component={TenantSettingScreen} />

                <Stack.Screen
                    //options={{ presentation: "modal" }}
                    name={"contract_memo_edit"}
                    component={ContractMemoEditScreen}
                />
                <Stack.Screen
                    options={{ presentation: "modal" }}
                    name={"send_message_to_building_tenants"}
                    component={BuildingSendMessageScreen}
                />
                <Stack.Screen name={"compose_message"} component={ComposeMessageScreen} />
                <Stack.Screen name={"contract_information"} component={TenantContractInfoScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"parking"} component={ParkingScreen} />
                <Stack.Screen name={"register_vehicle"} component={RegisterVehicleScreen} />
                <Stack.Screen name={"register_guest_vehicle"} component={RegisterGuestVehicleScreen} />
                <Stack.Screen name={"send_park_push_noti"} component={SendParkPushNotiScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"management_fee"} component={ManagementFeeHomeScreen} />
                <Stack.Screen name={"confirm_payment_cost"} component={ConfirmPaymentCostScreen} />
                <Stack.Screen name={"management_fee_detail"} component={ManagementFeeDetailScreen} />
                <Stack.Screen name={"building_mf_history"} component={BuildingMFHistoryScreen} />
                <Stack.Screen name={"mf_select_to_do_something"} component={MFSelectToDoSomethingScreen} />
                <Stack.Screen name={"wire_amount_manually"} component={WireAmountManually} />
                <Stack.Screen name={"request_payment_confirmation"} component={RequestPaymentConfirmationScreen} />
                <Stack.Screen name={"expense_approval"} component={ExpenseApprovalScreen} />
                <Stack.Screen
                    name={"management_fee_current_month_detail"}
                    component={ManagementFeeCurrentMonthDetailScreen}
                />
                <Stack.Screen name={"refund_policy"} component={RefundPolicyScreen} />
                <Stack.Screen name={"expense_compose_message"} component={ExpenseComposeMessageScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"my_page"} component={MyPageHomeScreen} />
                <Stack.Screen name={"mypage"} component={MyPageScreen} />
                <Stack.Screen name={"withdrawal"} component={WithdrawalScreen} />
                <Stack.Screen name={"general_webview"} component={MyPageWebViewScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"complaint"} component={ComplaintHomeScreen} />
                <Stack.Screen name={"complaint_register"} component={ComplaintRegisterScreen} />
                <Stack.Screen name={"complaint_detail"} component={ComplaintDetailScreen} />
                <Stack.Screen name={"complaint_modify"} component={ComplaintModifyScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"splash"} component={SplashScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "card" }}>
                <Stack.Screen name={"building_info"} component={BuildingInfoScreen} />
                <Stack.Screen name={"search_address"} component={SearchAddressScreen} />
                <Stack.Screen name={"image_detail_view"} component={ImageDetailView} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"test"} component={TestScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"company_introduction"} component={CompanyIntroductionScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"noti_home"} component={NoticeHomeScreen} />
                <Stack.Screen name={"noti_register"} component={NoticeRegisterScreen} />
                <Stack.Screen name={"noti_modify"} component={NoticeModifyScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"common_complaint_home"} component={CommonComplaintHomeScreen} />
                <Stack.Screen name={"common_complaint_modify"} component={CommonComplaintModifyScreen} />
                <Stack.Screen name={"common_complaint_register"} component={CommonComplaintRegisterScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"approval_home"} component={ApprovalHomeScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"payment_window"} component={CommonPaymentWindowScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
}

const checkVersionIsLatest = () =>
    villifeVersion.needToUpdate().then((r) => {
        if (r.isNeeded) {
            villifeVersion.getStoreUrl().then((storeUrl) => {
                Linking.canOpenURL(storeUrl).then((canOpenUrl) => {
                    if (canOpenUrl) {
                        Alert.alert(
                            "새로운 버전이 출시 되었습니다!",
                            `${Platform.OS === "ios" ? "앱스토어" : "플레이스토어"}에서 최신 버전(${
                                r.latestVersion
                            })으로 업그레이드 해주세요.`,
                            [
                                {
                                    text: "스토어로 이동",
                                    onPress: () => Linking.openURL(storeUrl),
                                },
                            ]
                        );
                    }
                });
            });
        }
    });
