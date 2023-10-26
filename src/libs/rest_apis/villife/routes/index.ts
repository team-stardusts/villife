import { RoutesType } from "./types";

const routes: RoutesType = {
    auth: {
        login: "auth/login",
        naverSocialLogin: "auth/social-login/naver",
        naverSocialJoin: "auth/signup/naver",
        registerFirebaseToken: "auth/register/firebase-token",
        loginRefresh: "auth/renew/access-token",
        verifyBuilding: "auth/verify/building-address",
        verifyRoom: "auth/verify/room",
    },
    approval: {
        approvalDecision: "approval/decision",
        getApprovalRequests: "approval/request",
        registerUserVehicle: "approval/request/2/1",
        decideApprovalRequest: "approval/decision",
        residenceValidation: "approval/request/1/1",
        requestMFPaymentConfirmation: "approval/request/3/1",
        checkUserIsWaitingForApproval: "approval/req-wait-check",
        //request_id
        // decision : approval or reject
    },
    budilingAndContract: {
        building: "building-and-contract/building",
        contract: "building-and-contract/contract",
        totalInfo: "building-and-contract/total-info",
        buildingNoti: "building-and-contract/noti",
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
        testVehicleResidenceValidation: "approval/request/2/1",
    },
    parking: {
        handleVechile: "park/vehicle",
        handleGuestVehicle: "park/guest-vehicle",
        updateParkInformation: "park/park-info",
        sendPushNotification: "park/noti",
    },
    userInfo: {
        getUserBasicInfo: "user/basicinfo",
        getBuildingManagedByAdmin: "user/buildings-admin-manages",
    },
    expense: {
        handleBuildingBill: "rental-expense/management-fee/building",
        handleMyBill: "rental-expense/management-fee/mine",
    },
    payment: {
        order: "payment/order",
    },
} as const;

export default routes;
