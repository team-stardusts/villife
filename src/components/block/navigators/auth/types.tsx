import AppRoutes from "../../../../data/routes.json"
import { LoginHosts } from "../../../../hooks/services/types"

export type AuthStackParamList = {
    login: {
        
    }
    join: {
        host: LoginHosts;
        access_token: string | null;
    }
}