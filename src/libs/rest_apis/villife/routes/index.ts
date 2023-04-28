import { RoutesType } from "./types";

const routes: RoutesType = {
    login: "auth/login",
    naverSocialLogin: "auth/social-login/naver",
    naverSocialJoin: "auth/signup/naver",
    registerFirebaseToken: "auth/register/firebase-token",
    loginRefresh: "auth/renew/access-token",
    verifyBuilding: "auth/verify/building-address",
    approvalDecision : "approval/decision",
    residenceValidation : 'approval/validate/residence',
    uploadImage: "media/upload/image",
    createNotice: "notice/create",
    updateNotice: "notice/update",
    deleteNotice: "notice/delete",
    getNoticesByBuildingID: "notice/get/list/by-building-id",

    //@deprecated for test
    testUserResidenceValidation:'approval/test/user-resi-validation'
} as const;

export default routes;
