import { LoginHosts } from "../../hooks/services/types";
import { Authority } from "../../libs/rest_apis/villife/types";

export type StackParamList = {
    login: {};
    create_account: {
        host: LoginHosts;
        access_token: string | null;
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
    search_address: {};
    terms_of_service: {};
    home: {};
    splash: {};
    test: {};
    noti_home : {}
    noti_register : {}
};
