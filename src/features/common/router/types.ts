import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Authority } from "../../../libs/rest_apis/villife/types";
import { HostType } from "../../../libs/rest_apis/villife/auth/types";
import { Complaint } from "../../../libs/rest_apis/villife/complaint/types";
import { BuildingTenant } from "../../main/buliding_management/services/types";
import { LayoutType } from "../../main/buliding_management/blocks/filter/blocks/layout_selector";

export type VillifeRootStackParamList = {
    login?: {};
    splash?: {};
    test?: {};
    home?: {};
    complaint?: {};
    parking?: {};
    payment?: {};
    mypage?: {};
    building_management?: {};
};

export const VILLIFE_ROOT_STACK_PARAMS: Array<keyof VillifeRootStackParamList> = [
    "login",
    "complaint",
    "home",
    "splash",
    "parking",
    "payment",
    "mypage",
    "building_management",
];

export type VillifeStackParamList = VillifeRootStackParamList & {
    create_account: {
        host: HostType;
        access_token: string | undefined;
    };
    welcome: {
        authority: Authority["ADMIN"] | Authority["RENTER"];
        host: HostType;
        id: string;
        password: string;
    };
    set_building?: {};
    search_address?: {};
    terms_of_service?: {};
    noti_home?: {};
    noti_register?: {};
    noti_modify: {
        title: string;
        content: string;
        notiID: number;
        priority: number;
    };
    permission_request?: {};
    complaint_register: {};
    complaint_modify: Complaint;
    approval_home: {};
    complaint_detail: Complaint;
    register_vehicle?: {};
    register_guest_vehicle?: {};
    send_park_push_noti: {
        vehicleID: number;
        messageType: SendParkPushNotiMessageType;
    };
    my_page: {};
    common_complaint_home: {};
    common_complaint_modify: {};
    common_complaint_register: {};
    image_detail_view: {
        uri: string;
    };
    send_message_to_building_tenants: {
        layout: LayoutType;
        tenants: string; //BuildingTenant[];
    };
    //building: {};
};

export const SEND_PARK_PUSH_NOTI_MESSAGE_TYPE = {
    DOUBLE_PARKING: "double_parking",
    CHANGE_REQUEST: "change_request",
} as const;

export type SendParkPushNotiMessageType =
    (typeof SEND_PARK_PUSH_NOTI_MESSAGE_TYPE)[keyof typeof SEND_PARK_PUSH_NOTI_MESSAGE_TYPE];

export type RouterParams = NativeStackScreenProps<VillifeStackParamList>;
export type VillifeNavigation = RouterParams["navigation"];
