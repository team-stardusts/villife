namespace Routes {
    export type Auth = {
        appleSocialLogin: string;
        login: string;
        signUp: string;
        naverSocialLogin: string;
        naverSocialJoin: string;
        registerFirebaseToken: string;
        loginRefresh: string;
        sendVerifyCode: string;
        verifyBuilding: string;
        verifyRoom: string;
        verifyPersonalInfo: string;
    };

    export type Approval = {
        approvalDecision: string;
        getApprovalRequests: string;
        registerUserVehicle: string;
        decideApprovalRequest: string;
        residenceValidation: string;
        requestMFPaymentConfirmation: string;
        checkUserIsWaitingForApproval: string;
    };

    export type BuildingAndContract = {
        building: string;
        contract: string;
        totalInfo: string;
        buildingNoti: string;
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
        testExpense: string;
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

    export type Expense = {
        handleBuildingBill: string;
        handleMyBill: string;
        confirmPayment: string;
    };

    export type Payment = {
        order: string;
    };

    export type Message = {
        sendMessage: string;
    };
}

export type RoutesType = {
    auth: Routes.Auth;
    approval: Routes.Approval;
    budilingAndContract: Routes.BuildingAndContract;
    complaint: Routes.Complaint;
    media: Routes.Media;
    notice: Routes.Notice;
    test: Routes.Test;
    parking: Routes.Parking;
    userInfo: Routes.UserInformation;
    expense: Routes.Expense;
    payment: Routes.Payment;
    message: Routes.Message;
};
