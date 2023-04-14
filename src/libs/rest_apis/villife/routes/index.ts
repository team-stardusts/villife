import { RoutesType } from "./types";

const routes: RoutesType = {
    login: "auth/login",
    naverSocialLogin: "auth/social-login/naver",
    naverSocialJoin: "auth/signup/naver",
    registerFirebaseToken: "auth/register/firebase-token",
    loginRefresh: "auth/renew/access-token",
    uploadImage: "media/upload/image",
    createNotice: "notice/create",
    updateNotice: "notice/update",
    deleteNotice: "notice/delete",
    getNoticesByBuildingID: "notice/get/list/by-building-id",
} as const;

export default routes;
