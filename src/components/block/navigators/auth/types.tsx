import AppRoutes from "../../../../data/routes.json"
import { LoginHosts } from "../../../../hooks/service/types"

export type AuthStackParamList = {
    login: {
        
    }
    join: {
        host: LoginHosts;
        access_token: string | null;
    }
}