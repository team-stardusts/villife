import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Authority } from "../../../libs/rest_apis/villife/types";
import { HostType } from "../../../libs/rest_apis/villife/auth/types";
import { Complaint } from "../../../libs/rest_apis/villife/complaint/types";
import { LayoutType } from "../../main/lease_contract/screens/home/blocks/layout/types";
import { Building } from "../../../libs/rest_apis/villife/building/types";
import { ManagementFee } from "../../../libs/rest_apis/villife/expense/types";
import {
    BuildingRoomContract,
    RegisterContract,
} from "../../main/lease_contract/services/building_rooms/provider/types";

export type VillifeRootStackParamList = {
    login?: {};
    splash?: {};
    test?: {};
    home?: {};
    complaint?: {};
    parking?: {};
    management_fee?: {};
    my_page?: {};
    lease_contract?: {};
};

export const VILLIFE_ROOT_STACK_PARAMS: Array<keyof VillifeRootStackParamList> = [
    "login",
    "complaint",
    "home",
    "splash",
    "parking",
    "management_fee",
    "my_page",
    "lease_contract",
];

export type VillifeStackParamList = VillifeRootStackParamList & {
    approval_home: {};
    building_mf_history?: {};
    confirm_payment_cost: VillifeStackParamList["payment_window"] & {
        bill?: {
            [key: string]: number;
        };
    };
    compose_message: {
        contractID: number;
    };
    common_complaint_home: {};
    common_complaint_modify: {};
    common_complaint_register: {};
    complaint_register: {};
    complaint_modify: Complaint;
    complaint_detail: Complaint;
    create_account: {
        host: HostType;
        access_token?: string | undefined;
    };
    set_account: {
        authority: Authority["ADMIN"] | Authority["RENTER"];
    };
    image_detail_view: {
        uri: string;
    };
    mypage: {};
    management_fee_detail?: {};
    mf_deposit_check: {
        //fees: ManagementFee.BuildingRenterMFHistory[]
        fees: string;
    };
    noti_home?: {};
    noti_register?: {};
    noti_modify: {
        title: string;
        content: string;
        notiID: number;
        priority: number;
    };
    set_building?: {};
    search_address?: {};
    send_message_to_building_tenants: {
        layout: LayoutType;
        tenants: string; //BuildingRoomInfo[];
    };
    send_park_push_noti: {
        vehicleID: number;
        messageType: SendParkPushNotiMessageType;
    };
    welcome: {
        authority: Authority["ADMIN"] | Authority["RENTER"];
        host: HostType;
        id?: string;
        password?: string;
    };
    wire_amount_manually?: {};
    permission_request?: {};
    payment_window: {
        title: string;
        product_id: number;
        product_type: "pt_management_fee" | "pt_monthlt_rent";
        product_name: string;
        price: number;
    };
    register_vehicle?: {};
    register_guest_vehicle?: {};
    register_building?: {};
    request_payment_confirmation: {
        accountID: number;
        amountWon: number;
        billIDs: number[];
    };
    tenant_detail: {
        roomInfo: string; //BuildingRoomInfo;
        contractID: number;
    };
    terms_of_service?: {};
    tenant_setting: {
        roomID: number;
        previous?: {
            contractID: number;
            contractorName: string;
            delinquencyRate: number;
            deposit: number;
            managementFee: number;
            monthlyRent: number;
            rentType: BuildingRoomContract["rentType"];
            roomId: number;
            expirationDate: string;
            startDate: string;
            phoneNumber: string;
        };
    };
    verify_personal_info: {
        authority: Authority["ADMIN"] | Authority["RENTER"];
        host: HostType;
        id: string;
        password: string;
    };
    verify_auth_code: {
        authority: Authority["ADMIN"] | Authority["RENTER"];
        host: HostType;
        identityNumberFrontDigit: string;
        mobileCarrier: string;
        phoneNumber: string;
        userName: string;
        id: string;
        password: string;
    };
    company_introduction?: {};
    expense_approval?: {};
    refund_policy?: {};
    //building: {};
};

export const SEND_PARK_PUSH_NOTI_MESSAGE_TYPE = {
    DOUBLE_PARKING: "double_parking",
    CHANGE_REQUEST: "change_request",
} as const;

export type SendParkPushNotiMessageType =
    (typeof SEND_PARK_PUSH_NOTI_MESSAGE_TYPE)[keyof typeof SEND_PARK_PUSH_NOTI_MESSAGE_TYPE];

export type VillifeRouterParams = NativeStackScreenProps<VillifeStackParamList>;
export type VillifeNavigation = VillifeRouterParams["navigation"];
