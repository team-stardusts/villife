import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Authority } from "../../../libs/rest_apis/villife/types";
import { HostType } from "../../../libs/rest_apis/villife/auth/types";
import { Complaint } from "../../../libs/rest_apis/villife/complaint/types";

export type VillifeRootStackParamList = {
    login?: {};
    splash?: {};
    test?: {};
    home?: {};
    complaint?: {};
    parking_home?: {};
    payment?: {};
    mypage?: {};
};

export const VILLIFE_ROOT_STACK_PARAMS: Array<keyof VillifeRootStackParamList> = [
    "login",
    "complaint",
    "home",
    "splash",
    "parking_home",
    "payment",
    "mypage",
];

export type VillifeStackParamList = VillifeRootStackParamList & {
    create_account: {
        host: HostType;
        access_token: string | undefined;
    };
    welcome: {
        authority: Authority["ADMIN"] | Authority["RENTER"];
        id: string;
        password: string;
    };
    set_building: {
        id: string;
        password: string;
    };
    search_address?: {};
    terms_of_service?: {};
    noti_home?: {};
    noti_register?: {};
    noti_modify: {
        title: string;
        content: string;
        notiID: number;
    };
    permission_request?: {};
    complaint_register: {};
    complaint_modify: {};
    complaint_detail: Complaint
};

export type RouterParams = NativeStackScreenProps<VillifeStackParamList>;
export type VillifeNavigation = RouterParams["navigation"];
