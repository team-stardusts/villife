import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LoginHosts } from "../../hooks/services/types";
import { Authority } from "../../libs/rest_apis/villife/types";

export type VillifeRootStackParamList = {
    login?: {};
    splash?: {};
    test?: {};
    home?: {};
    complaint?: {};
    parking?: {};
    payment?: {};
    mypage?: {};
};

export const VILLIFE_ROOT_STACK_PARAMS: Array<keyof VillifeRootStackParamList> = [
    "login",
    "complaint",
    "home",
    "splash",
    "parking",
    "payment",
    "mypage",
];

export type VillifeStackParamList = VillifeRootStackParamList & {
    create_account: {
        host: LoginHosts;
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
};

export type RouterParams = NativeStackScreenProps<VillifeStackParamList>;
export type VillifeNavigation = RouterParams["navigation"];
