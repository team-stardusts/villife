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
import CreateAccountScreen from "../../auth/screens/create_account";
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
import RegisterBuildingScreen from "../../main/lease_contract/screens/register_building";
import SendParkPushNotiScreen from "../../main/parking/screens/send_park_push_noti";
import SplashScreen from "../../splash/screens";
import SetBuildingScreen from "../../auth/screens/set_building";
import SearchAddressScreen from "../screens/search_address";
import TermsOfServiceScreen from "../../auth/screens/terms_of_service/index.";
import TestScreen from "../../test";
import useRoutingAdministratorByLogin from "./routing_admin";
import WelcomeScreen from "../../auth/screens/welcome";
import TenantDetailScreen from "../../main/lease_contract/screens/tenant_detail";
import TenantSettingScreen from "../../main/lease_contract/screens/tenant_setting";
import ComposeMessageScreen from "../../main/lease_contract/screens/compose_message";
import CommonPaymentWindowScreen from "../../expense/payment/screens/payment_window_common";
import ConfirmPaymentCostScreen from "../../expense/payment/screens/confirm_payment_cost";
import ManagementFeeDetailScreen from "../../expense/management_fee/screens/detail";
import { Platform } from "react-native";

enableScreens(true);

const Stack = createNativeStackNavigator<VillifeStackParamList>();

export default function ScreenRouter() {
    useRoutingAdministratorByLogin();
    useAutoRegisterFirebaseToken();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: Platform.select({
                    ios: "fade",
                    android: "fade",
                }),
            }}
            initialRouteName={"login"}>
            <Stack.Group>
                <Stack.Screen name={"permission_request"} component={PermissionRequestScreen} />
                <Stack.Screen name={"login"} component={LoginScreen} />
                <Stack.Screen name={"terms_of_service"} component={TermsOfServiceScreen} />
                <Stack.Screen name={"create_account"} component={CreateAccountScreen} />
                <Stack.Screen name={"welcome"} component={WelcomeScreen} />
                <Stack.Screen name={"set_building"} component={SetBuildingScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"home"} component={HomeScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"lease_contract"} component={LeaseContractHomeScreen} />
                <Stack.Screen name={"register_building"} component={RegisterBuildingScreen} />
                <Stack.Screen name={"tenant_detail"} component={TenantDetailScreen} />
                <Stack.Screen name={"tenant_setting"} component={TenantSettingScreen} />
                <Stack.Screen
                    options={{ presentation: "modal" }}
                    name={"send_message_to_building_tenants"}
                    component={BuildingSendMessageScreen}
                />
                <Stack.Screen name={"compose_message"} component={ComposeMessageScreen} />
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
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"my_page"} component={MyPageHomeScreen} />
                <Stack.Screen name={"mypage"} component={MyPageScreen} />
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
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name={"search_address"} component={SearchAddressScreen} />
                <Stack.Screen name={"image_detail_view"} component={ImageDetailView} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"test"} component={TestScreen} />
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
