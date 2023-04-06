import { RoutesType } from "./types";

const routes: RoutesType = {
    login: "auth/login",
    naverSocialLogin: "auth/social-login/naver",
    naverSocialJoin: "auth/signup/naver",
    registerFirebaseToken : "auth/register/firebase-token"
} as const;

export default routes;