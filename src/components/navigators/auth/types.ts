import { OnCompleteParams } from "@actbase/react-daum-postcode/lib/types";
import AppRoutes from "../../../data/routes.json"
import { LoginHosts } from "../../../hooks/services/types"

export type AuthStackParamList = {
    login: {
        
    };
    create_account: {
        host: LoginHosts;
        access_token: string | null;
    };
    set_building: {
        id: string;
        password: string;
    };
    search_address: {
        //onGoBack(data: OnCompleteParams): void;
    }
}