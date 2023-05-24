export type RoutesType = {
    login: string;
    naverSocialLogin: string;
    naverSocialJoin: string;
    registerFirebaseToken: string;
    loginRefresh: string;
    verifyBuilding: string;
    approvalDecision: string;
    residenceValidation: string;
    uploadImage: string;
    createNotice: string;
    updateNotice: string;
    deleteNotice: string;
    getNoticesByBuildingID: string;
    //compaint
    createComplaint: string;
    getUserComplaints: string;
    getBuildingComplaints: string;
    updateComplaint: string;
    deleteComplaint: string;
    reply: string;
    //user info
    getUserBasicInfo: string;
    //approval
    getUserApprovals: string;
    acceptUserApproval: string;
    rejectUserApproval: string;

    //test api
    testUserResidenceValidation: string;
};
