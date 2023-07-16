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
        getApprovalRequests: string;
        registerUserVehicle: string;
        decideApprovalRequest: string;
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
        testVehicleResidenceValidation: string;
    };

    export type Parking = {
        handleVechile: string;
        handleGuestVehicle: string;
        updateParkInformation: string;
        sendPushNotification: string;
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
