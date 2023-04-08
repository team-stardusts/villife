import { LoginHosts } from "../../hooks/services/types";

export type StackParamList = {
    login: {};
    create_account: {
        host: LoginHosts;
        access_token: string | null;
    };
    welcome: {
        role: "owner" | "member";
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
};
