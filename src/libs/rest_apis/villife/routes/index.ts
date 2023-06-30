import { RoutesType } from "./types";

const routes: RoutesType = {
    auth: {
        login: "auth/login",
        naverSocialLogin: "auth/social-login/naver",
        naverSocialJoin: "auth/signup/naver",
        registerFirebaseToken: "auth/register/firebase-token",
        loginRefresh: "auth/renew/access-token",
        verifyBuilding: "auth/verify/building-address",
    },
    approval: {
        approvalDecision: "approval/decision",
        getUser: "approval/get/list",
        acceptUser: "approval/accept",
        registerUserVehicle: "approval/request/2/1",
        rejectUser: "approval/reject",
        residenceValidation: "approval/validate/residence",
    },
    complaint: {
        createComplaint: "complaint/create",
        getOneComplaint: "complaint/get/one",
        getUserComplaints: "complaint/get/list",
        getBuildingComplaints: "complaint/get/list/by-building-id",
        updateComplaint: "complaint/update",
        deleteComplaint: "complaint/delete",
        reply: "complaint/reply",
    },
    media: {
        uploadImage: "media/upload/image",
    },
    notice: {
        createNotice: "notice/create",
        updateNotice: "notice/update",
        deleteNotice: "notice/delete",
        getNoticesByBuildingID: "notice/get/list/by-building-id",
    },
    test: {
        testUserResidenceValidation: "approval/test/user-resi-validation",
    },
    parking: {
        handleVechile: "park/vehicle",
        handleGuestVehicle: "park/guest-vehicle",
        updateParkInformation: "park/park-info",
    },
    userInfo: {
        getUserBasicInfo: "user/basicinfo",
        getBuildingManagedByAdmin: "user/buildings-admin-manages",
    },
} as const;

export default routes;
