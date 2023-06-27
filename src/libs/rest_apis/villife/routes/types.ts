/* export type RoutesType = {
    // Auth
    login: string;
    naverSocialLogin: string;
    naverSocialJoin: string;
    registerFirebaseToken: string;
    loginRefresh: string;
    verifyBuilding: string;

    // Approval
    approvalDecision: string;
    residenceValidation: string;

    // Media
    uploadImage: string;

    // Notice
    createNotice: string;
    updateNotice: string;
    deleteNotice: string;
    getNoticesByBuildingID: string;

    // Compaint
    createComplaint: string;
    getOneComplaint: string;
    getUserComplaints: string;
    getBuildingComplaints: string;
    updateComplaint: string;
    deleteComplaint: string;
    reply: string;

    // User information
    getUserBasicInfo: string;
    getBuildingManagedByAdmin: string;

    // Approval
    getUserApprovals: string;
    acceptUserApproval: string;
    rejectUserApproval: string;
    // Parking

    //test api
    testUserResidenceValidation: string;
}; */

namespace Routes {
    export type Auth = {
        login: string;
        naverSocialLogin: string;
        naverSocialJoin: string;
        registerFirebaseToken: string;
        loginRefresh: string;
        verifyBuilding: string;
    };
    export type Approval = {
        approvalDecision: string;
        getUserApprovals: string;
        acceptUserApproval: string;
        rejectUserApproval: string;
        residenceValidation: string;
    };
    export type Complaint = {
        createComplaint: string;
        getOneComplaint: string;
        getUserComplaints: string;
        getBuildingComplaints: string;
        updateComplaint: string;
        deleteComplaint: string;
        reply: string;
    };

    export type Media = {
        uploadImage: string;
    };

    export type Notice = {
        createNotice: string;
        updateNotice: string;
        deleteNotice: string;
        getNoticesByBuildingID: string;
    };

    export type Test = {
        testUserResidenceValidation: string;
    };

    export type Parking = {
        handleVechile: string;
        handleGuestVehicle: string;
        updateParkInformation: string;
    };

    export type UserInformation = {
        getUserBasicInfo: string;
        getBuildingManagedByAdmin: string;
    };
}

export type RoutesType = {
    auth: Routes.Auth;
    approval: Routes.Approval;
    complaint: Routes.Complaint;
    media: Routes.Media;
    notice: Routes.Notice;
    test: Routes.Test;
    parking: Routes.Parking;
    userInfo: Routes.UserInformation;
};
